from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

load_dotenv()

uri = f"mongodb+srv://admin:{os.getenv('MONGO_PASSWORD')}@treehacks.bnziq.mongodb.net/?retryWrites=true&w=majority&appName=treehacks"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection

def ping():
    print("Pinging MongoDB...")
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)


def save_course_info(course_info):
    try:
        # Validate that all required fields are present
        required_fields = ["course_code", "course_name", "university", "course_desc"]
        for field in required_fields:
            if field not in course_info:
                raise ValueError(f"Missing required field: {field}")
        
        # Insert the document
        result = client["course_info"]["courses"].insert_one({
            "course_code": course_info["course_code"],
            "course_name": course_info["course_name"],
            "university": course_info["university"],
            "course_desc": course_info["course_desc"],
        })
        return result.inserted_id
    
    except Exception as e:
        print(f"Error saving course info: {str(e)}")
        return None

def get_course_info(course_code, university):
    try:
        course_info = client["course_info"]["courses"].find_one({"course_code": course_code, "university": university})
        if course_info is None:
            print(f"No course found in storage for code {course_code} at {university}")
        else:
            print(f"Course info retrieved for {course_code} at {university} in storage")

        course_info.pop("_id", None)
        return course_info
    
    except Exception as e:
        print(f"Error retrieving course info: {str(e)}")
        return None
    
def save_equivalences(packaged_equivalences):
    try:
        client["course_info"]["equivalences"].insert_one(packaged_equivalences)            
    except Exception as e:
        print(f"Error saving equivalences: {str(e)}")
        return None
    
def get_equivalences(from_code, from_university, to_university):
    try:
        equivalences = client["course_info"]["equivalences"].find_one({"from_code": from_code, "from_university": from_university, "to_university": to_university})
        if equivalences is None:
            print(f"No equivalences found in storage for {from_code} at {from_university} to {to_university}")
        else:
            print(f"Equivalences retrieved for {from_code} at {from_university} to {to_university} in storage")
        return equivalences

    except Exception as e:
        print(f"Error retrieving equivalences: {str(e)}")
        return None
    
def add_user_favourite(user_id, eq_id):
    try:
        # Create a new document for each favorite
        result = client["user_info"]["favorites"].insert_one({
            "user_id": user_id,
            "eq_id": eq_id
        })
        return result.inserted_id is not None
    except Exception as e:
        print(f"Error adding user favourite: {str(e)}")
        return None
    
def remove_user_favourite(user_id, eq_id):
    try:
        result = client["user_info"]["favorites"].delete_one({
            "user_id": user_id,
            "eq_id": eq_id
        })
        return result.deleted_count > 0
    except Exception as e:
        print(f"Error removing user favourite: {str(e)}")
        return None

def get_user_favourites(user_id):
    try:
        favorites = client["user_info"]["favorites"].find({"user_id": user_id})
        return [fav["eq_id"] for fav in favorites]
    except Exception as e:
        print(f"Error getting user favourites: {str(e)}")
        return []

def get_course_info_by_eq_ids(eq_ids):
    # Find all equivalence documents that contain any of the eq_ids in their equivalences array
    equivalences_docs = list(client["course_info"]["equivalences"].find(
        {"equivalences.eq_id": {"$in": eq_ids}}
    ))

    # Remove the _id field from each equivalence entry
    for eq in equivalences_docs:
        eq.pop("_id", None)

    equivalences = []

    # Annotate each equivallence entry with if it is a favourite or not
    for equivalence_doc in equivalences_docs:
        for eq in equivalence_doc["equivalences"]:
            if eq["eq_id"] in eq_ids:
                eq["is_favourite"] = True
                equivalences.append(eq)
    
    print(equivalences)

    return equivalences

def get_equivalences_with_favourites(user_id, from_code, from_university, to_university):
    user_favourites = get_user_favourites(user_id)

    print(user_favourites)

    # Get all equivalences for the given from_code and from_university to to_university
    equivalence_doc = list(client["course_info"]["equivalences"].find({
        "from_code": from_code,
        "from_university": from_university,
        "to_university": to_university
    }))[0]

    print(equivalence_doc)

    # Annotate each equivalence with if it is a favourite or not
    equivalence_doc.pop("_id", None)
    for equivalence in equivalence_doc["equivalences"]:
        equivalence["is_favourite"] = equivalence["eq_id"] in user_favourites

    return equivalence_doc
    
