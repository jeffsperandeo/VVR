import openai
from supabase import create_client, Client
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Supabase client setup
url = os.getenv('SUPABASE_URL')
key = os.getenv('SUPABASE_ANON_KEY')
supabase: Client = create_client(url, key)

def get_chatbot_response(prompt):
    # Create OpenAI chat completion request
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content'].strip()

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
