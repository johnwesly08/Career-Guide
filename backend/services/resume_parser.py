import pdfplumber
import docx2txt
from fastapi import UploadFile, HTTPException
import tempfile
import os

async def extract_text_from_resume(resume: UploadFile) -> str:
    contents = await resume.read()

    # Save to a temporary file
    temp = tempfile.NamedTemporaryFile(delete=False)
    try:
        temp.write(contents)
        temp.close()

        # PDF parsing
        if resume.filename.endswith(".pdf"):
            with pdfplumber.open(temp.name) as pdf:
                text = "\n".join([page.extract_text() or "" for page in pdf.pages])
        
        # DOCX parsing
        elif resume.filename.endswith(".docx"):
            text = docx2txt.process(temp.name)

        # TXT or others (basic fallback)
        elif resume.filename.endswith(".txt"):
            text = contents.decode("utf-8", errors="ignore")

        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload a PDF, DOCX, or TXT.")

        # Final cleaning
        text = text.strip()
        if not text:
            raise HTTPException(status_code=400, detail="Resume appears to be empty or unreadable.")

        return text

    finally:
        os.remove(temp.name)