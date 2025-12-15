import json
import numpy as np
import re
from sklearn.metrics.pairwise import cosine_similarity
from langchain_core.prompts import PromptTemplate
from services.llm import get_chat_llm


def get_feedback_summary(resume: str, job_desc: str) -> str:
    prompt = PromptTemplate.from_template(
        """You are a career advisor. Given the resume and job description, write a short summary (2-3 sentences) highlighting the candidate's strengths and weaknesses.

        Resume:
        {resume}

        Job Description:
        {job_desc}

        Respond in plain English with no formatting.
        """
    )
    llm = get_chat_llm()
    chain = prompt | llm
    return chain.invoke({"resume": resume, "job_desc": job_desc})


def generate_analysis(resume_text: str, job_text: str, embeddings: dict):
    # Compute cosine similarity between resume and job description
    resume_vec = np.array(embeddings["resume_vector"]).reshape(1, -1)
    job_vec = np.array(embeddings["job_vector"]).reshape(1, -1)
    score = cosine_similarity(resume_vec, job_vec)[0][0] * 100

    # Generate LLM-based structured analysis
    prompt = PromptTemplate.from_template(
        """You are a job matching assistant. Analyze the resume and job description, and respond in this JSON format:
        
        {{
            "match_score": number (out of 100),
            "matching_skills": [list of matching skills],
            "missing_skills": [list of missing skills],
            "strengths": [list of strengths],
            "improvements": [list of suggested improvements]
        }}

        Resume:
        {resume}

        Job Description:
        {job}
        """
    )

    llm = get_chat_llm()
    chain = prompt | llm

    # Get structured JSON from LLM
    llm_raw = chain.invoke({"resume": resume_text, "job": job_text})
    print("RAW LLM RESPONSE:", llm_raw.content)
    try:
        raw_text = llm_raw.content.strip()
        if raw_text.startswith("```json") or raw_text.startswith("```"):
            raw_text = re.sub(r"^```json\s*|```$", "", raw_text).strip()
        
        json_match = re.search(r"{.*}", raw_text, re.DOTALL)
        if json_match:
            llm_json = json.loads(json_match.group())
        else:
            raise ValueError("No JSON block found in LLM response")
    
    except Exception as e:
        llm_json = {
            "match_score": round(score, 2),
            "matching_skills": [],
            "missing_skills": [],
            "strengths": [],
            "improvements": []
        }

    # Get plain-text feedback summary
    feedback_obj = get_feedback_summary(resume_text, job_text)
    summary_feedback = feedback_obj.content if hasattr(feedback_obj, 'content') else feedback_obj


    # Final output structured for the frontend
    return {
        "overallScore": llm_json.get("match_score", round(score, 2)),
        "matchingSkills": llm_json.get("matching_skills", []),
        "missingSkills": llm_json.get("missing_skills", []),
        "strengths": llm_json.get("strengths", []),
        "improvements": llm_json.get("improvements", []),
        "feedback": summary_feedback
    }
