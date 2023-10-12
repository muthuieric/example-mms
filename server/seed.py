# seed.py
from app import db, bcrypt, Student, CheckIn, Tm, User
from faker import Faker

fake = Faker()

# Sample data for CheckIn
checkin_data = [
    {'Name': 'Eric Muthui', 'Room_number': 101},
    {'Name': 'Joyce Washira', 'Room_number': 102},
    {'Name': 'Ian Imbuki', 'Room_number': 103},
    {'Name': 'Maimuna Mohamud', 'Room_number': 106}
]

def seed_checkins():
    for data in checkin_data:
        name = data['Name']
        room_number = data['Room_number']
        new_checkin = CheckIn(Name=name, Room_number=room_number)
        db.session.add(new_checkin)
    db.session.commit()

# Sample data for Students
student_data = [
    {
        'Name': 'John Doe',
        'idnumber': '12345',
        'phone': '555-555-5555',
        'laptop_model': 'Macbook Pro',
        'serial_number': 'MBP12345',
        'tm_name': 'Teacher A',
    },
    {
        'Name': 'Jane Smith',
        'idnumber': '54321',
        'phone': '555-555-1234',
        'laptop_model': 'Dell XPS',
        'serial_number': 'DXPS54321',
        'tm_name': 'Teacher B',
    },
]

def seed_students():
    for data in student_data:
        student = Student(**data)
        db.session.add(student)
    db.session.commit()

# Sample data for Tm
tm_data = [
    {
        'Name': 'TM One',
        'Phone': '555-555-5555',
        'Email': 'tm1@example.com',
    },
    {
        'Name': 'TM Two',
        'Phone': '555-555-1234',
        'Email': 'tm2@example.com',
    },
]

def seed_tms():
    for data in tm_data:
        tm = Tm(**data)
        db.session.add(tm)
    db.session.commit()

# Sample data for User
user_data = [
    {
        'Name': 'User One',
        'Phone': '555-555-5555',
        'Email': 'user1@example.com',
        'IDNumber': '12345',
        'Password': 'password1',  
    },
    {
        'Name': 'User Two',
        'Phone': '555-555-1234',
        'Email': 'user2@example.com',
        'IDNumber': '54321',
        'Password': 'password2',
    },
]
