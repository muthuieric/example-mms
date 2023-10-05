from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from models import CheckIn, db
from datetime import datetime 
from flask_restful import Api, Resource
from flask_cors import CORS
from sqlalchemy import func




app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///checkin.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False



migrate = Migrate(app, db)
db.init_app(app)

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



if __name__ == '__main__':
    app.run(port=5555, debug=True)

    
    
    
    
    
    
    
   