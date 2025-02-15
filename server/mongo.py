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
        # Add debug logging to see what we're searching for
        print(f"Searching for course with code: {course_code}, university: {university}")
        
        # Get the collection reference
        collection = client["course_info"]["courses"]
        
        # First, let's try to find the document and print the exact query
        query = {"course_code": course_code, "university": university}
        print(f"Query: {query}")
        
        # Let's also print all documents in the collection to debug
        print("All documents in collection:")
        all_docs = list(collection.find({}))
        for doc in all_docs:
            print(f"Found document: {doc}")
            
        course_info = collection.find_one(query)
        if course_info is None:
            print(f"No course found in storage for code {course_code} at {university}")
        else:
            print(f"Course info retrieved for {course_code} at {university} in storage")
        return course_info
    except Exception as e:
        print(f"Error retrieving course info: {str(e)}")
        return None




