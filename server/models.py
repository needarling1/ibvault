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

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=True)
    google_id = db.Column(db.String(200), nullable=True, unique=True)

class CompletedQuestions(db.Model):
    __tablename__ = 'completed_questions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    question_id = db.Column(db.Integer, nullable=False)