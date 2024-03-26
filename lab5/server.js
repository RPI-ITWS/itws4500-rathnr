const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MongoClient = mongodb.MongoClient;
const url = process.env.MONGODB;

app.get('/db', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db();
    const collection = db.collection('your_collection_name');
    const documents = await collection.find({}, { projection: { _id: 0, number: 1 } }).toArray();
    const numbers = documents.map((doc) => doc.number);
    res.json(numbers);
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/db/:number', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db();
    const collection = db.collection('your_collection_name');
    const number = parseInt(req.params.number);
    const document = await collection.findOne({ number: number }, { projection: { _id: 0 } });
    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/db', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db();
    const collection = db.collection('your_collection_name');
    const newDocument = req.body;
    await collection.insertOne(newDocument);
    res.json({ message: 'Document added successfully' });
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/db/:number', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db();
    const collection = db.collection('your_collection_name');
    const number = parseInt(req.params.number);
    const updatedDocument = req.body;
    const result = await collection.updateOne({ number: number }, { $set: updatedDocument });
    if (result.matchedCount > 0) {
      res.json({ message: 'Document updated successfully' });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/db', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db();
    const collection = db.collection('your_collection_name');
    const updatedDocuments = req.body;
    await collection.updateMany({}, { $set: updatedDocuments });
    res.json({ message: 'All documents updated successfully' });
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/db/:number', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db();
    const collection = db.collection('your_collection_name');
    const number = parseInt(req.params.number);
    await collection.deleteOne({ number: number });
    res.json({ message: 'Document deleted successfully' });
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/db', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db();
    const collection = db.collection('Web SI');
    await collection.deleteMany({});
    res.json({ message: 'All documents deleted successfully' });
    client.close();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});