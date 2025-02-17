from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


app.config["MONGO_URI"] = os.getenv("MONGODB_URI")
mongo = PyMongo(app)

@app.route('/')
def home():
    return "Welcome to the API!"

@app.route('/test-db')
def test_db():
    try:
        mongo.db.users.find_one()  # Test a simple query
        return jsonify({"message": "Database connection successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/users', methods=['POST', 'OPTIONS'])
def add_user():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    user_data = request.json
    print("Received user data:", user_data) 
    name = user_data.get('name')
    email = user_data.get('email')

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    user = {
        "name": name,
        "email": email
    }

    mongo.db.users.insert_one(user)
    print("User inserted successfully:", user)
    return jsonify(user), 201


if __name__ == '__main__':
    app.run(port=5000)