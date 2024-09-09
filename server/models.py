from flask import Flask
from extensions import db

class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key = True)
    question_name = db.Column(db.String)
    topic = db.Column(db.String)
    difficulty = db.Column(db.String)
    question = db.Column(db.String)
    answer = db.Column(db.String)

    def to_dict(self):
        return {
            'id': self.id,
            'question_name': self.question_name,
            'topic': self.topic,
            'difficulty': self.difficulty,
            'question': self.question,
            'answer': self.answer
        }
