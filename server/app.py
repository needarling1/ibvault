import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

from extensions import db, bcrypt
from routes import questions, question, grade, logger, google_logger, register, check_auth, logout



load_dotenv()
env = os.environ


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = env.get('SQLALCHEMY_DATABASE_URI')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = env.get('SECRET_KEY')
    app.config['SESSION_COOKIE_SECURE'] = False
    app.config['SESSION_COOKIE_SAMESITE'] = None
    
    db.init_app(app)
    bcrypt.init_app(app)

    migrate = Migrate(app, db)

    app.register_blueprint(questions)
    app.register_blueprint(question)
    app.register_blueprint(grade)
    app.register_blueprint(logger)
    app.register_blueprint(google_logger)
    app.register_blueprint(register)
    app.register_blueprint(check_auth)
    app.register_blueprint(logout)

    CORS(app, supports_credentials=True, origins=['https://main--ibvault.netlify.app'])

    return app