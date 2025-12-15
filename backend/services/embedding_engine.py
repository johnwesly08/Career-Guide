from langchain_huggingface import HuggingFaceEmbeddings

openai_embeddings = HuggingFaceEmbeddings(model_name = "all-MIniLM-L6-v2")

def get_embeddings(resume_text: str, job_text: str):
    resume_vector = openai_embeddings.embed_query(resume_text)
    job_vector = openai_embeddings.embed_query(job_text)

    return {
        "resume_vector" : resume_vector,
        "job_vector" : job_vector
    }