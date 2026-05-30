# AI Resume Screener

AI Resume Screener is a full-stack web application that analyzes candidate resumes against a Job Description (JD) and ranks candidates based on skill matching and scoring.

---

## Features

- Upload multiple resumes (PDF / DOCX)
- Paste Job Description
- AI-based resume analysis
- Candidate scoring & ranking
- Analytics dashboard
- Candidate charts & visualization
- Export report functionality
- Remove uploaded resumes (CRUD operation)
- Responsive modern UI

---

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Recharts
- Axios
- Lucide React

### Backend
- FastAPI
- Python
- Uvicorn
- PyPDF2
- python-docx

### Deployment
- Frontend → Vercel
- Backend → Render

---

## Project Structure

```txt
AI-Resume-Screener/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── utils/
│
└── README.md
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/026-savi/AI-Resume-Screener.git
cd AI-Resume-Screener
```

---

### 2. Backend Setup

Go to backend folder:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs on:

```txt
http://127.0.0.1:8000
```

Swagger API Docs:

```txt
http://127.0.0.1:8000/docs
```

---

### 3. Frontend Setup

Open new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## Deployment URLs

### Frontend (Vercel)

Paste your deployed frontend URL here:

```txt
https://your-vercel-url.vercel.app
```

### Backend (Render)

```txt
https://ai-resume-screener-nu3v.onrender.com
```

---

## Architecture Overview

Frontend (React) sends Job Description and Resume files to FastAPI backend.

Backend:
1. Extracts text from uploaded resumes.
2. Parses job description skills.
3. Calculates candidate score.
4. Returns ranking & analytics data.

Frontend:
- Displays KPI cards
- Charts
- Candidate ranking table
- Export functionality

---

## Candidate Scoring Approach

Candidate scores are calculated based on:

- Skill matching between JD and Resume
- Matching keywords percentage
- Resume relevance score

Higher skill match → Higher candidate score.

---

## Assumptions

- Resumes are uploaded in PDF/DOCX format.
- JD contains required technical skills.
- Scoring is keyword-based.
- Missing skills indicate low-match candidates.

---

## Live Application

Frontend:

(Add your Vercel URL)

Backend:

https://ai-resume-screener-nu3v.onrender.com

---

## Author

Savi
