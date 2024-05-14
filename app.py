from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt_identity
from chatbot_service import get_chatbot_response, save_chat_history
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Configure your Flask app to use the JWT extension
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')  # Change this to a secure key
jwt = JWTManager(app)

# Mock user database
users = {
    "user1": {"password": "password1", "id": "user1_id"},
    "user2": {"password": "password2", "id": "user2_id"}
}

@app.route('/')
def index():
    return "Flask API is running. Available endpoints: /login, /api/chatbot"

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = users.get(username)

    if user and user['password'] == password:
        access_token = create_access_token(identity=user['id'])
        return jsonify(access_token=access_token)
    else:
        return jsonify({"msg": "Bad username or password"}), 401

@app.route('/api/chatbot', methods=['POST'])
@jwt_required()
def chatbot():
    data = request.get_json()
    prompt = data.get('prompt')
    response = get_chatbot_response(prompt)
    user_id = get_jwt_identity()  # Extract the user ID from the JWT
    save_chat_history(user_id, prompt, response)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run()
