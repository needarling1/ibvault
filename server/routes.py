import os
import time
from dotenv import load_dotenv
import requests

from flask import Blueprint, request, jsonify, session

from extensions import db, bcrypt
from models import Question, User, CompletedQuestions
from sqlalchemy.exc import IntegrityError

from openai import OpenAI

load_dotenv()
env = os.environ

questions = Blueprint('questions', __name__)
question = Blueprint('question', __name__)
grade = Blueprint('grade', __name__)
logger = Blueprint('login', __name__)
google_logger = Blueprint('google_login', __name__)
register = Blueprint('register', __name__)
check_auth = Blueprint('check_auth', __name__)
logout = Blueprint('logout', __name__)



@questions.route('/api/questions', methods=['GET'])
def get_questions():
    user_id = session.get('user_id')
    questions = Question.query.order_by('id').all()
    completed_questions = []

    if user_id:
        completed_questions = CompletedQuestions.query.with_entities(CompletedQuestions.question_id).filter_by(user_id=user_id).all()
        completed_questions = [q[0] for q in completed_questions]

    questions_list = [q.to_dict() for q in questions]

    return jsonify({"questions": questions_list, "completed_questions": completed_questions})

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
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(email=email, password_hash=password_hash)

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
    if user and user.password_hash and bcrypt.check_password_hash(user.password_hash, password):
        session['user_id'] = user.id
        session['email'] = user.email
        return jsonify({'message': 'Logged in successfully', 'user': {
        'id': user.id,
        'email': user.email
    }}), 200
    elif user and not user.password_hash:
        return jsonify({'message': 'Google Login required for this user'}), 401
    else:
        return jsonify({'message': 'Invalid username or password.'}), 401
    
@logout.route('/api/logout', methods=['POST'])
def logout_session():
    session.clear()
    return jsonify({'message': 'success'}), 200

@check_auth.route('/api/check-auth', methods=['GET'])
def check_authorization():
    user_id = session.get('user_id')
    user = User.query.filter_by(id=user_id).first()
    if user:
        return jsonify({'message': 'Authorized', 'user': {
        'id': user.id,
        'email': user.email
    }}), 200
    else:
        return jsonify({'message': 'Unauthorized'}), 401

@google_logger.route('/api/google-login', methods=['POST'])
def google_login():
    code = request.get_json()

    code = code['code']['code']

    token_url = "https://oauth2.googleapis.com/token"

    data = {
        'code': code,
        'client_id': env.get('CLIENT_ID'),
        'client_secret': env.get('CLIENT_SECRET'),
        'redirect_uri': env.get('REDIRECT_URI'),
        'grant_type': 'authorization_code'
    }

    response = requests.post(token_url, data=data)
    token_info = response.json()
    access_token = token_info.get('access_token')


    user_info_url = "https://www.googleapis.com/oauth2/v1/userinfo"

    headers = {"Authorization": f"Bearer {access_token}"}

    user_info_response = requests.get(user_info_url, headers=headers)

    user_info = user_info_response.json()

    google_id = user_info['id']
    email = user_info['email']

    user = User.query.filter_by(email=email).first()

    if user:
        session['user_id'] = user.id
        session['email'] = user.email
        user_check = User.query.filter_by(google_id=google_id).first()
        if not user_check:
            user.google_id = google_id
            db.session.commit()

        return jsonify({'message': 'Logged in successfully', 'user': {
        'id': user.id,
        'email': user.email
    }}), 200
    else:
        new_user = User(email=email, google_id=google_id)

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id
        session['email'] = new_user.email
        return jsonify({'message': 'Logged in successfully', 'user': {
        'id': new_user.id,
        'email': new_user.email
    }}), 200


@grade.route('/api/questions/grade', methods=['POST'])
def grade_answer():
    data = request.json

    question_id = data.get('question_id')

    question = Question.query.get(question_id)
    question = question.to_dict()

    answer = data.get('answer')

    result = gpt_grader(question_id, question, answer)

    return jsonify( {'result': result} )

def gpt_grader(question_id, question, answer):
    user_id = session.get('user_id')

    content = f"question_db: {question['question']} user_answer: {answer}"

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

    if run.status == 'completed': 
        messages = client.beta.threads.messages.list(
            thread_id=thread.id
        )

    last_message = messages.data[0]
    response = last_message.content[0].text.value

    if response == "Correct":
        existing_entry = CompletedQuestions.query.filter_by(user_id=user_id, question_id=question_id).first()
        if not existing_entry:
            new_completion = CompletedQuestions(
                user_id=user_id,
                question_id=question_id
            )

            db.session.add(new_completion)
            db.session.commit()

    
    return response
