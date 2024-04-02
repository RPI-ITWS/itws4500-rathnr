const express = require('express');
const { MongoClient } = require('mongodb');
const axios = require('axios');

const app = express();
app.use(express.json());

const url = 'mongodb://loconst dbName = 'weatherdb';
const collectionName = 'weatherdata';

const weatherStackKey = 'ce698321ea5516bfa393219914782330';
const weatherApiKey = '52e7f5d6-d648-4551-af6d-975ab3a03adc';
const tomorrowIoKey = 'CWvhHWXs7Y1amXpdVCetrS2jXVmLFTLS';

async function fetchFromWeatherStack() {
  try {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${weatherStackKey}`);
    return response.data;
  } catch (error) {
    console.error('Erro    return null;
  }
}

async function fetchFromWeatherApi() {
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=London`);
    return response.data;
  } catch (error) {
    console.error('Error fetching da    return null;
  }
}

async function fetchFromTomorrowIo() {
  try {
    const response = await axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${tomorrowIoKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Tomorrow.io:', error);
    return null;
  }
}

function transformData(data) {
  return {
    temperature: data.current.temperature,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_speed,
    weatherDescription: data.current.weather_descriptions[0],
  };
}

async function loadData(data) {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertMany(data);
    console.log('Data loaded successfully');
    client.close();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

app.get('/api/data', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const documents = await collection.find({}).toArray();
    res.json(documents);
    client.close();
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(req.body);
    res.json(result.ops[0]);
    client.close();
  } catch (error) {    console.error('Error adding data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/data/:id', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set:    );
    res.json(result);
    client.close();
  } catch (error) {
    console.error('Error updating    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/data/:id', async (req, res) => {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
    client.close();
  } catch (error) {
    console.error('Error deleting data:', error    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/weatherstack', async (req, res) => {
  try {
    const data = await fetchFromWeatherStack();
    const transformedData = transformData(data);
    await loadData([transformedData]);
    res.json(transformedData);
  } catch (error) {
    console.error('Error in WeatherStack API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/weatherapi', async (req, res) => {
  try {
    const data = await fetchFromWeatherApi();
    const transformedData = transformData(data);
    await loadData([transformedData]);
    res.json(transformedData);
  } catch (e    console.error('Error in WeatherAPI:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/tomorrowio', async (req, res) => {
  try {
    const data = await fetchFromTomorrowIo();
    const transformedData = transformData(data);
    await loadData([transformedData]);
    res.json(transformedData);
  } catch (error) {
    console.error('Error in Tomorrow.io API:'    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});