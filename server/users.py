from mongo import add_user_favourite, remove_user_favourite, get_user_favourites, get_course_info_by_eq_ids, get_equivalences_with_favourites

class UserManager:
    def add_user_favourite(self, user_id, eq_id):
        return add_user_favourite(user_id, eq_id)

    def remove_user_favourite(self, user_id, eq_id):
        return remove_user_favourite(user_id, eq_id)
    
    def get_user_favourites(self, user_id):
        return get_user_favourites(user_id)
    
    def get_user_favourites_with_course_info(self, user_id):
        return get_course_info_by_eq_ids(self.get_user_favourites(user_id))
    
    def get_equivalences_with_favourites(self, user_id, from_code, from_university, to_university):
        return get_equivalences_with_favourites(user_id, from_code, from_university, to_university)
        
    