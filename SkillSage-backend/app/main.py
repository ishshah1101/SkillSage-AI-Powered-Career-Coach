from fastapi import FastAPI
from app.api import chat, match
from app.services import resume
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="SkillSage - AI Career Coach",
    description="RAG-powered Resume Analyzer and Career Coach API",
    version="1.0.0"
)
# 👇 Add this CORS middleware setup

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend's Vite server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(resume.router, prefix="/resume", tags=["Resume Upload"])
app.include_router(chat.router, prefix="/chat", tags=["Career Q&A"])
app.include_router(match.router, prefix="/match")

@app.get("/")
async def root():
    return {"message": "SkillSage backend is running 🚀"}
