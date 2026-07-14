from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"status": "Backend is running!"}

@app.get("/api/message")
def read_message():
    return {"message": "Backend connected to frontend babe"}

@app.get("/gym")
def get_gym_data():
    return {
        "status": "success",
        "data": {
            "name": "GymFlo Active Members",
            "count": 2450
        }
    }