from flask import Flask, jsonify, request
from courseSearch import CourseSearch
app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"message": "Welcome to the API!"})


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
    result = course_search.courseFinder(course_code, university, target_school=target_school, num=5)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)