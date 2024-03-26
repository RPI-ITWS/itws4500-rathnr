#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar 25 20:13:02 2024

@author: rahulrathnam
"""

import json
from pymongo import MongoClient

# MongoDB connection URL
url = 'mongodb+srv://rahulrathnam25:qD4WgJWFPr4Xdu4b@cluster0.ynga7dz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

# Database and collection names
db_name = 'web_sci'
collection_name = 'news'

# Read the JSON data from a file
with open('articles.json', 'r') as file:
    json_data = json.load(file)

# Connect to MongoDB
client = MongoClient(url)
db = client[db_name]
collection = db[collection_name]

# Insert the JSON data into the MongoDB collection
if isinstance(json_data, list):
    collection.insert_many(json_data)
else:
    collection.insert_one(json_data)

# Close the MongoDB connection
client.close()