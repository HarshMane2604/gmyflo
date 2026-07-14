# GymFlo — Role-Based Authentication System Design

## Tech Stack

- **Backend:** FastAPI (Python)
- **Frontend:** Next.js (App Router)
- **Database:** PostgreSQL (via SQLAlchemy + Alembic)
- **Auth:** JWT (access + refresh tokens) + Google OAuth 2.0

---

## 1. Roles & Permissions

| Role             | Key Permissions                                                                 |
|------------------|---------------------------------------------------------------------------------|
| `super_admin`    | Full system access, manage all gyms, manage gym owners, platform-level settings |
| `gym_owner`      | Manage own gym(s), manage trainers & members, billing, reports                  |
| `trainer`        | View assigned members, manage workouts/schedules, mark attendance               |
| `member`         | View own profile, book classes, view plans, make payments                       |

---

## 2. Database Schema

### `users` table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),          -- NULL for Google OAuth-only users
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'member'
        CHECK (role IN ('super_admin', 'gym_owner', 'trainer', 'member')),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `oauth_accounts` table

```sql
CREATE TABLE oauth_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,        -- 'google'
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMPTZ,
    UNIQUE(provider, provider_user_id)
);
```

### `refresh_tokens` table

```sql
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    device_info VARCHAR(255),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    revoked BOOLEAN DEFAULT FALSE
);
```

### `gyms` table (for multi-gym context)

```sql
CREATE TABLE gyms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    owner_id UUID NOT NULL REFERENCES users(id),
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### `gym_memberships` table (links trainers/members to a gym)

```sql
CREATE TABLE gym_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    gym_id UUID NOT NULL REFERENCES gyms(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('trainer', 'member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, gym_id)
);
```

---

## 3. FastAPI Backend Structure

```
app/
├── main.py
├── config.py                  # Settings (JWT secret, Google OAuth creds, DB URL)
├── database.py                # SQLAlchemy engine & session
├── models/
│   ├── user.py
│   ├── oauth_account.py
│   ├── refresh_token.py
│   └── gym.py
├── schemas/
│   ├── auth.py                # Login, Register, Token request/response
│   └── user.py                # User CRUD schemas
├── api/
│   ├── deps.py                # get_current_user, role_checker dependencies
│   ├── auth.py                # /register, /login, /refresh, /google/callback
│   ├── users.py               # User CRUD (admin-facing)
│   └── gyms.py
├── services/
│   ├── auth_service.py        # Password hashing, token creation/verification
│   └── google_oauth.py        # Google OAuth flow logic
├── middleware/
│   └── role_guard.py          # Role-based access middleware
└── alembic/                   # DB migrations
```

---

## 4. Core Backend Code

### 4.1 — JWT Token Utilities (`services/auth_service.py`)

```python
from datetime import datetime, timedelta, timezone
from uuid import UUID
import jwt
from passlib.context import CryptContext
from app.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(user_id: UUID, role: str) -> str:
    payload = {
        "sub": str(user_id),
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),  # e.g. 15 min
        "type": "access",
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")

def create_refresh_token(user_id: UUID) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),  # e.g. 7 days
        "type": "refresh",
    }
    return jwt.encode(payload, settings.JWT_REFRESH_SECRET, algorithm="HS256")

def decode_token(token: str, secret: str) -> dict:
    return jwt.decode(token, secret, algorithms=["HS256"])
```

### 4.2 — Auth Dependencies (`api/deps.py`)

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.services.auth_service import decode_token
from app.config import settings
from app.database import get_db
from app.models.user import User
from sqlalchemy.orm import Session

bearer_scheme = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    token = credentials.credentials
    try:
        payload = decode_token(token, settings.JWT_SECRET)
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = db.query(User).filter(User.id == payload["sub"], User.is_active == True).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def require_roles(*allowed_roles: str):
    """Dependency factory — restricts endpoint to specific roles."""
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role '{current_user.role}' is not permitted",
            )
        return current_user
    return role_checker
```

### 4.3 — Auth Routes (`api/auth.py`)

```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.refresh_token import RefreshToken
from app.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from app.services.auth_service import (
    hash_password, verify_password,
    create_access_token, create_refresh_token, decode_token,
)
from app.config import settings
import hashlib

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=TokenResponse)
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == body.email).first():
        raise HTTPException(400, "Email already registered")

    user = User(
        email=body.email,
        password_hash=hash_password(body.password),
        full_name=body.full_name,
        role=body.role if body.role else "member",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    access = create_access_token(user.id, user.role)
    refresh = create_refresh_token(user.id)
    _store_refresh_token(db, user.id, refresh)

    return TokenResponse(access_token=access, refresh_token=refresh, role=user.role)


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not user.password_hash or not verify_password(body.password, user.password_hash):
        raise HTTPException(401, "Invalid credentials")
    if not user.is_active:
        raise HTTPException(403, "Account deactivated")

    access = create_access_token(user.id, user.role)
    refresh = create_refresh_token(user.id)
    _store_refresh_token(db, user.id, refresh)

    return TokenResponse(access_token=access, refresh_token=refresh, role=user.role)


@router.post("/refresh", response_model=TokenResponse)
def refresh_tokens(refresh_token: str, db: Session = Depends(get_db)):
    try:
        payload = decode_token(refresh_token, settings.JWT_REFRESH_SECRET)
    except Exception:
        raise HTTPException(401, "Invalid refresh token")

    token_hash = hashlib.sha256(refresh_token.encode()).hexdigest()
    stored = db.query(RefreshToken).filter(
        RefreshToken.token_hash == token_hash,
        RefreshToken.revoked == False,
    ).first()
    if not stored:
        raise HTTPException(401, "Refresh token revoked or not found")

    # Rotate: revoke old, issue new pair
    stored.revoked = True
    user = db.query(User).filter(User.id == payload["sub"]).first()
    new_access = create_access_token(user.id, user.role)
    new_refresh = create_refresh_token(user.id)
    _store_refresh_token(db, user.id, new_refresh)
    db.commit()

    return TokenResponse(access_token=new_access, refresh_token=new_refresh, role=user.role)


@router.post("/logout")
def logout(refresh_token: str, db: Session = Depends(get_db)):
    token_hash = hashlib.sha256(refresh_token.encode()).hexdigest()
    stored = db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash).first()
    if stored:
        stored.revoked = True
        db.commit()
    return {"message": "Logged out"}


def _store_refresh_token(db: Session, user_id, raw_token: str):
    token_hash = hashlib.sha256(raw_token.encode()).hexdigest()
    db.add(RefreshToken(user_id=user_id, token_hash=token_hash, expires_at=...))
    db.commit()
```

### 4.4 — Google OAuth (`api/auth.py` continued)

```python
from app.services.google_oauth import get_google_auth_url, exchange_google_code

@router.get("/google/login")
def google_login():
    """Redirect user to Google consent screen."""
    return {"url": get_google_auth_url()}


@router.get("/google/callback")
def google_callback(code: str, db: Session = Depends(get_db)):
    """Exchange auth code for user info, create/link account, return JWT."""
    google_user = exchange_google_code(code)

    # Check if OAuth account exists
    oauth = db.query(OAuthAccount).filter(
        OAuthAccount.provider == "google",
        OAuthAccount.provider_user_id == google_user["sub"],
    ).first()

    if oauth:
        user = oauth.user
    else:
        # Check if email already exists (link accounts)
        user = db.query(User).filter(User.email == google_user["email"]).first()
        if not user:
            user = User(
                email=google_user["email"],
                full_name=google_user["name"],
                avatar_url=google_user.get("picture"),
                is_verified=True,
                role="member",   # default role for Google sign-ups
            )
            db.add(user)
            db.commit()
            db.refresh(user)

        db.add(OAuthAccount(
            user_id=user.id,
            provider="google",
            provider_user_id=google_user["sub"],
        ))
        db.commit()

    access = create_access_token(user.id, user.role)
    refresh = create_refresh_token(user.id)
    _store_refresh_token(db, user.id, refresh)

    # Redirect to frontend with tokens
    return RedirectResponse(
        f"{settings.FRONTEND_URL}/auth/callback?access_token={access}&refresh_token={refresh}"
    )
```

### 4.5 — Using Role Guards on Endpoints

```python
from app.api.deps import require_roles, get_current_user

# Only super_admin can list all gyms
@router.get("/admin/gyms")
def list_all_gyms(user=Depends(require_roles("super_admin")), db=Depends(get_db)):
    return db.query(Gym).all()

# Gym owner + super_admin can manage trainers
@router.get("/gyms/{gym_id}/trainers")
def list_trainers(gym_id: str, user=Depends(require_roles("super_admin", "gym_owner")), db=Depends(get_db)):
    ...

# Any authenticated user can view their own profile
@router.get("/me")
def get_profile(user=Depends(get_current_user)):
    return user

# Trainers can view their assigned members
@router.get("/trainer/members")
def trainer_members(user=Depends(require_roles("trainer")), db=Depends(get_db)):
    ...
```

---

## 5. Next.js Frontend Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── auth/callback/page.tsx      # Handles Google OAuth redirect
│   ├── (dashboard)/
│   │   ├── layout.tsx                   # Auth-guarded layout
│   │   ├── admin/                       # super_admin pages
│   │   ├── owner/                       # gym_owner pages
│   │   ├── trainer/                     # trainer pages
│   │   └── member/                      # member pages
│   └── layout.tsx
├── lib/
│   ├── api.ts                           # Axios instance with interceptors
│   ├── auth.ts                          # Token helpers (get, set, remove)
│   └── roles.ts                         # Role constants & permission map
├── hooks/
│   └── useAuth.ts                       # Auth context hook
├── components/
│   ├── AuthProvider.tsx                 # Context provider
│   ├── RoleGuard.tsx                    # Protects routes by role
│   └── GoogleLoginButton.tsx
└── middleware.ts                        # Next.js middleware for route protection
```

### 5.1 — Token Management (`lib/auth.ts`)

```typescript
const ACCESS_KEY = "gymflo_access_token";
const REFRESH_KEY = "gymflo_refresh_token";

export const getAccessToken = () => localStorage.getItem(ACCESS_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const decodeToken = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};
```

### 5.2 — Axios Instance with Auto-Refresh (`lib/api.ts`)

```typescript
import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // e.g. http://localhost:8000
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = getRefreshToken();
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          null,
          { params: { refresh_token: refresh } }
        );
        setTokens(data.access_token, data.refresh_token);
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return api(original);
      } catch {
        clearTokens();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 5.3 — Auth Context (`components/AuthProvider.tsx`)

```tsx
"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAccessToken, decodeToken, clearTokens, setTokens } from "@/lib/auth";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
  full_name: string;
  role: "super_admin" | "gym_owner" | "trainer" | "member";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      api.get("/me").then(({ data }) => setUser(data)).catch(() => clearTokens());
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    setTokens(data.access_token, data.refresh_token);
    const me = await api.get("/me");
    setUser(me.data);
    router.push(getDashboardPath(me.data.role));
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

function getDashboardPath(role: string) {
  const map: Record<string, string> = {
    super_admin: "/admin",
    gym_owner: "/owner",
    trainer: "/trainer",
    member: "/member",
  };
  return map[role] || "/member";
}
```

### 5.4 — Role Guard Component (`components/RoleGuard.tsx`)

```tsx
"use client";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function RoleGuard({ allowedRoles, children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (!user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
```

### 5.5 — Using RoleGuard in Pages

```tsx
// app/(dashboard)/admin/page.tsx
import RoleGuard from "@/components/RoleGuard";

export default function AdminDashboard() {
  return (
    <RoleGuard allowedRoles={["super_admin"]}>
      <h1>Super Admin Dashboard</h1>
      {/* ... */}
    </RoleGuard>
  );
}

// app/(dashboard)/owner/page.tsx
import RoleGuard from "@/components/RoleGuard";

export default function OwnerDashboard() {
  return (
    <RoleGuard allowedRoles={["super_admin", "gym_owner"]}>
      <h1>Gym Owner Dashboard</h1>
      {/* ... */}
    </RoleGuard>
  );
}
```

### 5.6 — Next.js Middleware for Route Protection (`middleware.ts`)

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login", "/register", "/auth/callback"];

const roleRouteMap: Record<string, string[]> = {
  "/admin":   ["super_admin"],
  "/owner":   ["super_admin", "gym_owner"],
  "/trainer": ["super_admin", "gym_owner", "trainer"],
  "/member":  ["super_admin", "gym_owner", "trainer", "member"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Check for token in cookies (set cookie on login for SSR compatibility)
  const token = request.cookies.get("gymflo_access_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Decode role from JWT (lightweight check — full validation on API side)
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const role = payload.role;

    for (const [route, roles] of Object.entries(roleRouteMap)) {
      if (pathname.startsWith(route) && !roles.includes(role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
```

---

## 6. Auth Flow Diagrams

### Email/Password Flow

```
User → POST /auth/register or /auth/login
  ↓
FastAPI validates credentials
  ↓
Returns { access_token, refresh_token, role }
  ↓
Next.js stores tokens → redirects to role-based dashboard
  ↓
Every API call → Bearer token in header
  ↓
On 401 → auto-refresh via /auth/refresh → retry
```

### Google OAuth Flow

```
User clicks "Sign in with Google"
  ↓
Frontend redirects to GET /auth/google/login
  ↓
FastAPI returns Google consent URL → user authenticates
  ↓
Google redirects to /auth/google/callback?code=...
  ↓
FastAPI exchanges code → gets user info → creates/links account
  ↓
Redirects to frontend /auth/callback?access_token=...&refresh_token=...
  ↓
Frontend stores tokens → redirects to dashboard
```

---

## 7. Security Checklist

- **Short-lived access tokens** (15 min) with longer refresh tokens (7 days)
- **Refresh token rotation** — old token revoked on each refresh
- **Password hashing** with bcrypt
- **Refresh tokens stored as SHA-256 hashes** in DB (not plaintext)
- **CORS** configured to allow only your frontend origin
- **HTTPS** enforced in production
- **Rate limiting** on /login and /register (use `slowapi`)
- **Role checked server-side** on every protected endpoint (never trust the frontend)
- **Google OAuth** state parameter to prevent CSRF (add to production)

---

## 8. Key Python Packages

```
fastapi
uvicorn
sqlalchemy
alembic
psycopg2-binary
python-jose[cryptography]   # or PyJWT
passlib[bcrypt]
httpx                        # for Google OAuth HTTP calls
python-multipart
slowapi                      # rate limiting
```

## 9. Key npm Packages

```
axios
jwt-decode                   # (optional, for typed decoding)
next-auth                    # (optional alternative to custom OAuth)
```
