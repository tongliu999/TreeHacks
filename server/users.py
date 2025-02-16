import mongo

class UserManager:
    def add_user_favourite(self, user_id, from_code, from_university, to_university, eq_id):
        mongo.add_user_favourite(user_id, from_code, from_university, to_university, eq_id)

    def remove_user_favourite(self, user_id, from_code, from_university, to_university):
        mongo.remove_user_favourite(user_id, from_code, from_university, to_university)
    
    def get_user_favourites(self, user_id, from_code, from_university, to_university):
        result = mongo.get_user_favourites(user_id, from_code, from_university, to_university)
        return {
            "user_id": user_id,
            "from_code": from_code,
            "from_university": from_university,
            "to_university": to_university,
            "favourites": result
        }
    
    def get_courses_with_favourites(self, user_id, from_code, from_university, to_university):
        courses = mongo.get_course_info(from_code, from_university)
        favourites = self.get_user_favourites(user_id, from_code, from_university, to_university)
        favourite_ids = set([favourite["equivalence_id"] for favourite in favourites])
        merged_courses = []
        for course in courses:
            merged_course = {
                "course_code": course["course_code"],
                "course_name": course["course_name"],
                "course_desc": course["course_desc"],
                "is_favourite": False
            }
            if course["equivalence_id"] in favourite_ids:
                merged_course["is_favourite"] = True
            merged_courses.append(merged_course)

        return merged_courses
    
    
    