const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB connection URL
const url = 'mongodb+srv://rahulrathnam25:qD4WgJWFPr4Xdu4b@cluster0.ynga7dz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Database and collection names
const dbName = 'web_sci';
const collectionName = 'news';

// Read the JSON data from a file
const jsonData = JSON.parse(fs.readFileSync('articles.json', 'utf8'));

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Insert the JSON data into the MongoDB collection
  if (Array.isArray(jsonData)) {
    collection.insertMany(jsonData, (err, result) => {
      if (err) {
        console.error('Error inserting documents:', err);
      } else {
        console.log('Documents inserted successfully');
      }
      client.close();
    });
  } else {
    collection.insertOne(jsonData, (err, result) => {
      if (err) {
        console.error('Error inserting document:', err);
      } else {
        console.log('Document inserted successfully');
      }
      client.close();
    });
  }
});