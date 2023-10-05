from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
import pytz



db = SQLAlchemy()

east_timezone = pytz.timezone('Africa/Nairobi')


class CheckIn(db.Model, SerializerMixin):
    __tablename__ = 'checkin'
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String) 
    Room_number = db.Column(db.Integer)  
    time_in = db.Column(db.DateTime, default=datetime.now(tz=east_timezone)) 

    def __repr__(self):
        return f'CheckIn: {self.Name}, Room_number: {self.Room_number}, time_in: {self.time_in}'
    


