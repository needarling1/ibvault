from flask import Blueprint

from extensions import db
from models import Question

questions = Blueprint('question', __name__)

@questions.route('/api/questions', methods=['GET'])
def get_questions():
    questions = Question.query.all()

    questions_list = [q.all_to_dict() for q in questions]
    return questions_list