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
    

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    id_number = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f'User(ID: {self.id}, Name: {self.name}, Email: {self.email}, Phone: {self.phone}, ID Number: {self.id_number})'


class Tm(db.Model, SerializerMixin):
    __tablename__ = 'tm'
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String)
    Phone = db.Column(db.String)
    Email = db.Column(db.String)

    def __repr__(self):
        return f'Tm: {self.Name}, Phone: {self.Phone}, Email: {self.Email}'
    

class Student(db.Model, SerializerMixin):
    __tablename__ = 'student'
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String)
    idnumber = db.Column(db.String)  
    phone = db.Column(db.String)  
    laptop_model = db.Column(db.String)  
    serial_number = db.Column(db.String)  
    tm_name = db.Column(db.String)  

    def __repr__(self):
        return f'Student: {self.Name}, ID: {self.idnumber}, Phone: {self.phone}, Laptop Model: {self.laptop_model}, Serial Number: {self.serial_number}, TM: {self.tm_name}'
