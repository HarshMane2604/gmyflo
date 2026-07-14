FROM python:3.12-slim

WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 8000

# Run the application (using shell form to read PORT env var injected by Railway)
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}