from pymongo import MongoClient

# Connect to local MongoDB
client = MongoClient("mongodb://localhost:27017")

# Database
db = client["deepvision_ai"]

# Collection
analysis_collection = db["analysis_history"]