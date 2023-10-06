import os
from flask import Flask, request, jsonify, make_response, redirect, url_for, session
from datetime import datetime 
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from sqlalchemy import func
import jwt
import bcrypt
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity




from models import CheckIn, db, User, Tm, Student





app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///checkin.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '123456'  # Replace with a strong secret key




migrate = Migrate(app, db)

db.init_app(app)
# bcrypt = Bcrypt(app)
jwt = JWTManager(app)


CORS(app)


# ... (previous code)

api = Api(app)


 
@app.route("/checkins", methods=['GET', 'POST'])
def checkin():
    if request.method == 'GET':
        checkins = CheckIn.query.all()
        return make_response(jsonify([checkin.to_dict() for checkin in checkins]), 200)

    if request.method == 'POST':
        data = request.get_json()
        checkin = CheckIn(Name=data.get('Name'), Room_number=data.get('Room_number'), time_in=datetime.utcnow())
        db.session.add(checkin)
        db.session.commit()
        return make_response(
            jsonify(
                {'id': checkin.id, 'Name': checkin.Name, 'Room_number': checkin.Room_number, 'time_in': checkin.time_in }
            ),
            201  # Use HTTP status code 201 for resource created
        )
    
@app.route("/checkins/<int:id>", methods=['PUT', 'PATCH'])
def update_checkin(id):
    if request.method == 'PUT' or request.method == 'PATCH':
        data = request.get_json()
        checkin = CheckIn.query.get(id)
        
        if not checkin:
            return make_response(jsonify({'error': 'CheckIn not found'}), 404)

        # Update the CheckIn properties
        if 'Name' in data:
            checkin.Name = data['Name']
        if 'Room_number' in data:
            checkin.Room_number = data['Room_number']

        db.session.commit()

        return make_response(checkin.to_dict(), 200)


# Dashboard


@app.route("/total-checkins", methods=['GET'])
def total_checkins():
    total_checkins = db.session.query(db.func.count(CheckIn.id)).scalar()
    return jsonify({"total_checkins": total_checkins})

@app.route('/room-data', methods=['GET'])
def get_room_data():
    # Query the database to count people in each room
    room_data = db.session.query(
        CheckIn.Room_number, func.count(CheckIn.id).label('count')
    ).group_by(CheckIn.Room_number).all()

    # Format the data as a list of dictionaries
    room_data_formatted = [
        {'Room_number': room_number, 'count': count} for room_number, count in room_data
    ]

    return jsonify({'rooms': room_data_formatted})  



# api

class CheckIns(Resource):

    def get(self):
        checkins = [checkin.to_dict() for checkin in CheckIn.query.all()]
        return make_response(jsonify(checkins), 200)

    def post(self):
        data = request.get_json()

        new_checkin = CheckIn(
            name=data['Name'],
            room_number=data['Room_number'],
        )

        db.session.add(new_checkin)
        db.session.commit()

        return make_response(new_checkin.to_dict(), 201)


api.add_resource(CheckIns, '/checkins')


class CheckInByID(Resource):

    def get(self, id):
        checkin = CheckIn.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(checkin), 200)
    

    def patch(self, id):

        data = request.get_json()

        checkin = CheckIn.query.filter_by(id=id).first()
        for attr, value in data.items():
            setattr(checkin, attr, value)

        db.session.add(checkin)
        db.session.commit()

        checkin_dict = checkin.to_dict()

        response = make_response(
            jsonify(checkin_dict),
            200
        )

        return response
    
    def delete(self, id):
        checkin = CheckIn.query.filter_by(id=id).first()

        if not checkin:
            return make_response(jsonify({'error': 'CheckIn not found'}), 404)

        db.session.delete(checkin)
        db.session.commit()

        return '', 204 


api.add_resource(CheckInByID, '/checkins/<int:id>')



# Registration
# Create a resource for User
@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()  # Assuming the client sends JSON data

    # Extract data from the request
    name = data.get('Name')
    phone = data.get('Phone')
    email = data.get('Email')
    id_number = data.get('IDNumber')
    password = data.get('Password')

    # Hash the password before storing it
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())


    # Create a new user object with the hashed password
    new_user = User(name=name, phone=phone, email=email, id_number=id_number, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201  # Return a success response

# login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('Email')
    password = data.get('Password')

    user = User.query.filter_by(email=email).first()

    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user.password):
            access_token = create_access_token(identity=user.id)
            return jsonify({'token': access_token}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

# Protect a route with JWT authentication
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    current_user_id = get_jwt_identity()
    return jsonify({'message': f'Protected route accessed by user {current_user_id}'}), 200


# logout
@app.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    # Your logout logic here, such as clearing the JWT token from the client
    return jsonify({"message": "Logged out successfully"}), 200



# Route to get all Tm records
@app.route("/tms", methods=['GET'])
def get_tms():
    tms = Tm.query.all()
    return jsonify([tm.to_dict() for tm in tms])

# Route to create a new Tm record
@app.route("/add-tm", methods=['POST'])
def create_tm():
    data = request.get_json()
    tm = Tm(Name=data.get('Name'), Phone=data.get('Phone'), Email=data.get('Email'))
    db.session.add(tm)
    db.session.commit()
    return make_response(
        jsonify({'id': tm.id, 'Name': tm.Name, 'Phone': tm.Phone, 'Email': tm.Email}),
        201  # Use HTTP status code 201 for resource created
    )

# Route to update an existing Tm record by ID
@app.route("/tms/<int:id>", methods=['PUT'])
def update_tm(id):
    data = request.get_json()
    tm = Tm.query.get(id)

    if not tm:
        return make_response(jsonify({'error': 'Tm not found'}), 404)

    # Update the Tm properties
    if 'Name' in data:
        tm.Name = data['Name']
    if 'Phone' in data:
        tm.Phone = data['Phone']
    if 'Email' in data:
        tm.Email = data['Email']

    db.session.commit()

    # Return the updated Tm record as a JSON response
    return make_response(jsonify({'id': tm.id, 'Name': tm.Name, 'Phone': tm.Phone, 'Email': tm.Email}), 200)

# Route to delete an existing Tm record by ID
@app.route("/tms/<int:id>", methods=['DELETE'])
def delete_tm(id):
    tm = Tm.query.get(id)

    if not tm:
        return make_response(jsonify({'error': 'Tm not found'}), 404)

    db.session.delete(tm)
    db.session.commit()

    return jsonify({'message': 'Tm deleted successfully'})

# Students

# Route to get all Student records
@app.route("/students", methods=['GET'])
def get_students():
    students = Student.query.all()
    return jsonify([student.to_dict() for student in students])

# Route to create a new Student record
@app.route("/add-student", methods=['POST'])
def create_student():
    data = request.get_json()
    student = Student(Name=data.get('Name'), idnumber=data.get('idnumber'), phone=data.get('phone'), laptop_model=data.get('laptop_model'), serial_number=data.get('serial_number'), tm_name=data.get('tm_name'))
    db.session.add(student)
    db.session.commit()
    return make_response(
        jsonify({'id': student.id, 'Name': student.Name, 'idnumber': student.idnumber, 'phone': student.phone, 'laptop_model': student.laptop_model, 'serial_number': student.serial_number, 'tm_name': student.tm_name}),
        201  # Use HTTP status code 201 for resource created
    )

# Route to update an existing Student record by ID
@app.route("/students/<int:id>", methods=['PUT'])
def update_student(id):
    data = request.get_json()
    student = Student.query.get(id)

    if not student:
        return make_response(jsonify({'error': 'Student not found'}), 404)

    # Update the Student properties
    if 'Name' in data:
        student.Name = data['Name']
    if 'idnumber' in data:
        student.idnumber = data['idnumber']
    if 'phone' in data:
        student.phone = data['phone']
    if 'laptop_model' in data:
        student.laptop_model = data['laptop_model']
    if 'serial_number' in data:
        student.serial_number = data['serial_number']
    if 'tm_name' in data:
        student.tm_name = data['tm_name']

    db.session.commit()

    # Return the updated Student record as a JSON response
    return make_response(jsonify({'id': student.id, 'Name': student.Name, 'idnumber': student.idnumber, 'phone': student.phone, 'laptop_model': student.laptop_model, 'serial_number': student.serial_number, 'tm_name': student.tm_name}), 200)

# Route to delete an existing Student record by ID
@app.route("/students/<int:id>", methods=['DELETE'])
def delete_student(id):
    student = Student.query.get(id)

    if not student:
        return make_response(jsonify({'error': 'Student not found'}), 404)

    db.session.delete(student)
    db.session.commit()

    return jsonify({'message': 'Student deleted successfully'})


if __name__ == '__main__':
    app.run(port=5555, debug=True)

    
    

    
   