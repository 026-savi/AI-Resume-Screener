from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form
from typing import List
import os

from parser import parse_resume
from scorer import calculate_score
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/analyze")
async def analyze(
    jd: str = Form(...),
    files: List[UploadFile] = File(...)
):

    results = []

    for file in files:

        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        content = await file.read()

        with open(filepath, "wb") as f:
            f.write(content)

        resume_text = parse_resume(filepath)

        score = calculate_score(
            jd,
            resume_text
        )

        results.append({

            "candidate": file.filename,

            "score": round(score,2)

        })

    results.sort(
        key=lambda x:x["score"],
        reverse=True
    )

    return {

        "jd": jd,

        "count": len(results),

        "results": results

    }