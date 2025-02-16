from flask import Flask, jsonify, request
from course_search import CourseSearch
from mongo import ping
from users import UserManager

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"message": "Welcome to the API!"})

@app.route('/get_course_desc', methods=['POST'])
def get_course_desc():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    from_university = data.get('from_university')
    if not from_university:
        return jsonify({"error": "From university is required"}), 400
    
    from_code = data.get('from_code')
    if not from_code:
        return jsonify({"error": "From code is required"}), 400
    
    course_search = CourseSearch()
    result = course_search.get_course_desc(from_code, from_university)
    
    return jsonify(result)

@app.route('/course_search', methods=['POST'])
def course_search():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    university = data.get('university')
    if not university:
        return jsonify({"error": "University is required"}), 400
        
    course_code = data.get('course_code')
    if not course_code:
        return jsonify({"error": "Course code is required"}), 400
        
    target_school = data.get('target_school', 'Stanford University')
    
    course_search = CourseSearch()
    result = course_search.course_finder(course_code, university, target_school=target_school, num=2)
    
    return result

# Gets the search course info, and annotate with whether it is a favourite or not
@app.route('/get_user_courses', methods=['POST'])
def get_user_courses():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    from_code = data.get('from_code')
    if not from_code:
        return jsonify({"error": "From code is required"}), 400
    
    from_university = data.get('from_university')
    if not from_university:
        return jsonify({"error": "From university is required"}), 400
    
    to_university = data.get('to_university')
    if not to_university:
        return jsonify({"error": "To university is required"}), 400

    user_manager = UserManager()
    result = user_manager.get_courses_with_favourites(user_id, from_code, from_university, to_university)
    return result

@app.route('/add_favourite', methods=['POST'])
def add_favourite():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    eq_id = data.get('eq_id')
    if not eq_id:
        return jsonify({"error": "Equivalence ID is required"}), 400

    user_manager = UserManager()
    success = user_manager.add_user_favourite(user_id, eq_id)
    if success:
        return jsonify({"message": "Favourite added", "user_id": user_id, "eq_id": eq_id}), 200
    return jsonify({"error": "Failed to add favourite"}), 500

@app.route('/remove_favourite', methods=['POST'])
def remove_favourite():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    eq_id = data.get('eq_id')
    if not eq_id:
        return jsonify({"error": "Equivalence ID is required"}), 400

    user_manager = UserManager()
    success = user_manager.remove_user_favourite(user_id, eq_id)
    if success:
        return jsonify({"message": "Favourite removed", "user_id": user_id, "eq_id": eq_id}), 200
    return jsonify({"error": "Failed to remove favourite"}), 500

@app.route('/get_favourites', methods=['GET'])
def get_favourites():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    user_manager = UserManager()
    result = user_manager.get_user_favourites(user_id)
    return result

@app.route('/get_favourites_with_course_info', methods=['GET'])
def get_favourites_with_course_info():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    user_manager = UserManager()
    result = user_manager.get_user_favourites_with_course_info(user_id)
    return result

@app.route('/get_equivalences_with_favourites', methods=['GET'])
def get_equivalences_with_favourites():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    from_code = data.get('from_code')
    if not from_code:
        return jsonify({"error": "From code is required"}), 400
    
    from_university = data.get('from_university')
    if not from_university:
        return jsonify({"error": "From university is required"}), 400
    
    to_university = data.get('to_university')
    if not to_university:
        return jsonify({"error": "To university is required"}), 400
    
    user_manager = UserManager()
    result = user_manager.get_equivalences_with_favourites(user_id, from_code, from_university, to_university)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
