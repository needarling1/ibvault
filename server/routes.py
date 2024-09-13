import os
import time
from dotenv import load_dotenv

from flask import Blueprint, request, jsonify

from extensions import db
from models import Question

import openai
from openai import OpenAI

load_dotenv()
env = os.environ

questions = Blueprint('questions', __name__)
question = Blueprint('question', __name__)
grade = Blueprint('grade', __name__)

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

@grade.route('/api/questions/grade', methods=['POST'])
def grade_answer():
    start = time.time()

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
