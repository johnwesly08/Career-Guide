# Career Compass

**Career Compass** is an AI-powered web application designed to analyze resumes against job descriptions, offering gap analysis, personalized feedback, and an interactive chat interface for career guidance.

## 🚀 Overview

Career Compass leverages modern full-stack technologies and AI models to provide users with:

* Match score between resume and job description
* Identified matching and missing skills
* Personalized improvement suggestions
* Chat-based career guidance

## 🧰 Tech Stack

### 🔙 Backend (FastAPI)

* **Python 3.12**
* **FastAPI**
* **Langchain** (LLM integration via `llm_factory`)
* **Uvicorn** (ASGI server)
* **Pydantic** (for schema validation)
* **PyMuPDF** (PDF resume parsing)
* Langchain memory/chat components

### 🔜 Frontend (Next.js with TypeScript)

* **Next.js 14+**
* **Shadcn/UI** components
* **Axios** (API calls)
* **React Hooks**
* **TailwindCSS** (styling)

### ⚙️ DevOps & Tooling

* **Docker & Docker Compose**
* **Makefile** (CLI automation)
* **GitHub Actions** (CI/CD)
* **Ruff/Black** (linting & formatting)

## 📁 Project Structure

```
career-compass/
├── backend/
│   ├── app/
│   │   ├── api/v1/
│   │   ├── core/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   ├── tests/
│   ├── Dockerfile
│   ├── pyproject.toml
│   └── requirements.txt
├── frontend/
│   ├── app/(dashboard)/
│   ├── components/
│   ├── lib/
│   ├── types/
│   ├── Dockerfile
│   ├── package.json
│   └── .env.local.example
├── docker-compose.yml
├── Makefile
├── README.md
└── .github/workflows/
```

## 🔑 Key Backend Modules

* **`/analyze` Endpoint**
  Input: Resume (PDF), Job Description (Text)
  Flow: Text extraction → Embedding generation → Similarity scoring → Analysis response

* **`/chat` Endpoint**
  Input: User message
  Flow: Session memory handling → Contextual LLM response

* **Services**

  * `llm_factory.py`: Central LLM initialization
  * `chat_handler.py`: Chat chain setup with memory
  * `resume_parser.py`: PDF resume text extraction
  * `embedding_engine.py`: Embedding and similarity logic
  * `llm_analyzer.py`: Core analysis and report formatting

## 💻 Frontend Notes

* `resume-uploader.tsx`: Upload + form handler
* `results-card.tsx`: Displays analysis results
* `api.ts`: Axios wrapper
* `types/api.d.ts`: Shared frontend-backend types

## 🧪 Testing

* `backend/tests/test_api.py`: Pytest-based endpoint testing
* `conftest.py`: Fixtures for mocking uploads/data

## 🛠️ CLI & Dev Scripts

* **Run App**:

  ```bash
  make run
  ```

* **Run Tests**:

  ```bash
  make test
  ```

## 📝 To-Do & Enhancements

* [ ] Resume Strength Scorer
* [ ] Real-time Skill Suggestions via Job APIs
* [ ] Admin Panel for insights
* [ ] Resume Enhancer with dynamic tips
* [ ] Multi-language support

## 👨‍💻 Developer Tips

* Keep frontend/backend type contracts in sync (`types/api.d.ts` and `schemas/`)
* Use Docker/Makefile for zero-config development
* Test APIs via Postman before commits
* Use `uvicorn --reload` for backend dev

---

**Maintainer:** Mr. Wesly — Engineering, Architecture, and Deployment Lead.
