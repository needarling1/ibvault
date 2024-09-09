from flask import Blueprint

from extensions import db
from models import Question

questions = Blueprint('questions', __name__)
question = Blueprint('question', __name__)

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