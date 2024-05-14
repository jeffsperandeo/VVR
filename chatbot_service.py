import openai
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Set up your OpenAI API key
api_key = os.getenv('OPENAI_API_KEY')

# Supabase client setup
url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_ANON_KEY')
supabase: Client = create_client(url, key)

def get_chatbot_response(prompt):
    # Create OpenAI client
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )
    return response.choices[0].text.strip()

def save_chat_history(user_id, prompt, response):
    data = {
        "user_id": user_id,
        "prompt": prompt,
        "response": response
    }
    supabase.table("chat_history").insert(data).execute()

def get_chat_history(user_id):
    response = supabase.table("chat_history").select("*").eq("user_id", user_id).execute()
    return response.data
