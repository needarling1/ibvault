import os
import time
from dotenv import load_dotenv

from flask import Blueprint, request, jsonify, session

from extensions import db, bcrypt
from models import Question, User
from sqlalchemy.exc import IntegrityError

import openai
from openai import OpenAI

load_dotenv()
env = os.environ

questions = Blueprint('questions', __name__)
question = Blueprint('question', __name__)
grade = Blueprint('grade', __name__)
logger = Blueprint('login', __name__)
google_logger = Blueprint('google_login', __name__)
register = Blueprint('register', __name__)


@questions.route('/api/questions', methods=['GET'])
def get_questions():
    questions = Question.query.order_by('id').all()

    questions_list = [q.to_dict() for q in questions]
    return questions_list

@question.route('/api/questions/<int:id>', methods=['GET'])
def get_questions(id):
    question = Question.query.get(id)

    question = question.to_dict()
    return question

@register.route('/api/register', methods=['POST'])
def create_account():
    data = request.get_json()

    password = data.get('password')
    email = data.get('email')
    if not password or not email:
        return jsonify({'message': 'Username, email, and password are required.'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered.'}), 400

    if len(password) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long.'}), 400

    try:
        # Hash the password
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create new user instance
        new_user = User(email=email, password_hash=password_hash)

        # Add to database
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully.'}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username or email already exists.'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred during registration.'}), 500

@logger.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'message': 'Username and password are required.'}), 400

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        session['email'] = user.email
        return jsonify({'message': 'Logged in successfully.'}), 200
    else:
        return jsonify({'message': 'Invalid username or password.'}), 401

@google_logger.route('/api/google-login', methods=['POST'])
def google_login():
    print(request)
    data = request.json
    print(data)
    return data

@grade.route('/api/questions/grade', methods=['POST'])
def grade_answer():
    start = time.time()

    user_id = session.get('user_id')

    print(user_id)

    data = request.json

    question_id = data.get('question_id')

    question = Question.query.get(question_id)
    question = question.to_dict()

    answer = data.get('answer')

    result = gpt_grader(question, answer)

    end = time.time()

    print(end - start)

    return jsonify( {'result': result} )

def gpt_grader(question, answer):
    content = f"question_db: {question['question']} answer_db: {question['answer']} user_answer: {answer}"

    client = OpenAI(
        api_key=env.get('API_KEY'),
        organization=env.get('ORG'),
        project=env.get('PROJECT'), 
    )

    thread = client.beta.threads.create()

    message = client.beta.threads.messages.create(
        thread_id=thread.id,
        role="user",
        content=content
    )

    run = client.beta.threads.runs.create_and_poll(
        thread_id=thread.id,
        assistant_id=env.get('ASSISTANT'),
    )

    print(run.status)

    if run.status == 'completed': 
        messages = client.beta.threads.messages.list(
            thread_id=thread.id
        )
        print(messages)
    else:
        print(run.status)
        print(run.last_error)

    last_message = messages.data[0]
    response = last_message.content[0].text.value
    
    return response
