# app/api/match.py
from fastapi import APIRouter, Body
from app.services.resume import get_resume_text
from app.services.matching import compare_resume_with_jd

router = APIRouter()

@router.post("/compare")
def match_resume_with_job(job_description: str = Body(..., embed=True)):
    resume_text = get_resume_text()
    if not resume_text:
        return {"result": "❌ Resume not uploaded yet."}
    
    result = compare_resume_with_jd(resume_text, job_description)
    return {"result": result}
