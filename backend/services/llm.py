import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq


load_dotenv()

def get_chat_llm():
    """
    Returns a lightweight, fast model from Groq (LLaMA 3 8B)
    Ideal for free-tier usage and quick responses.
    """

    return ChatGroq(
        model_name = "llama-3.1-8b-instant",
        temperature = 0.7,
        groq_api_key = os.getenv("GROQ_API_KEY"),
        max_retries = 2
    )