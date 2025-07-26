from app.services.resume import get_resume_text
from difflib import SequenceMatcher
import re
from collections import Counter

# Extract top keywords from a block of text
def extract_keywords(text: str, top_k: int = 30):
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
    stopwords = set([
        "the", "and", "for", "with", "from", "this", "that", "have", "will", "you", "are", "not",
        "but", "all", "has", "was", "can", "who", "your", "job", "our", "etc", "get", "more",
        "must", "should", "required", "preferred", "ability", "skills"
    ])
    filtered = [word for word in words if word not in stopwords]
    keyword_counts = Counter(filtered)
    return [word for word, _ in keyword_counts.most_common(top_k)]

# Core comparison function
def compare_with_job_description(job_description: str) -> dict:
    resume_text = get_resume_text()
    if not resume_text:
        return {"result": "❌ Resume not uploaded yet."}

    jd_keywords = extract_keywords(job_description)
    resume_keywords = extract_keywords(resume_text)

    matching_keywords = sorted(set(jd_keywords) & set(resume_keywords))
    missing_keywords = sorted(set(jd_keywords) - set(resume_keywords))
    similarity = SequenceMatcher(None, resume_text.lower(), job_description.lower()).ratio()

    # Format results for frontend
    result_markdown = f"""\
### ✅ Match Summary

- **Similarity Score:** `{round(similarity * 100, 2)}%`
- **Matching Keywords:** `{', '.join(matching_keywords) if matching_keywords else 'None'}`
- **Missing Keywords:** `{', '.join(missing_keywords) if missing_keywords else 'None'}`

### 📌 Recommendations
{"- " + '\n- '.join([f"Try including these keywords: {', '.join(missing_keywords)}"]) if missing_keywords else "✅ Great! Your resume aligns well with the job description."}
"""

    return {
        "similarity_score": round(similarity, 2),
        "matching_keywords": matching_keywords,
        "missing_keywords": missing_keywords,
        "result": result_markdown
    }
