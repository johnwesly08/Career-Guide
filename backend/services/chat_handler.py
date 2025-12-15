from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from services.llm import get_chat_llm 


llm = get_chat_llm()

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."), 
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])

runnable = prompt | llm

store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

chain_with_history = RunnableWithMessageHistory(
    runnable,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

def chat_with_user(message: str, session_id: str = "default") -> str:
    """
    Generates a response while maintaining conversation history by session_id.
    """
    try:
        response = chain_with_history.invoke(
            {"input": message},
            config={"configurable": {"session_id": session_id}}
        )
        return response.content if hasattr(response, 'content') else str(response)
    except Exception as e:
        return f"Error: {str(e)}"