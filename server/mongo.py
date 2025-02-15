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






