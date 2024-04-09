const axios = require('axios');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'weatherdb';
const collectionName = 'weatherdata';

const weatherStackKey = 'ce698321ea5516bfa393219914782330';
const weatherApiKey = '52e7f5d6-d648-4551-af6d-975ab3a03adc';
const tomorrowIoKey = 'CWvhHWXs7Y1amXpdVCetrS2jXVmLFTLS';

async function fetchFromWeatherStack() {
  try {
    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${weatherStackKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from WeatherStack:', error);
    return null;
  }
}

async function fetchFromWeatherApi() {
  try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=London`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from WeatherAPI:', error);
    return null;
  }
}

async function fetchFromTomorrowIo() {
  try {
    const response = await axios.get(`https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=${tomorrowIoKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Tomorrow');
  }