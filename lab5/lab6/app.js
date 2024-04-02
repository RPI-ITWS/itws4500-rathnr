import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('/api/data');
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleAddData = async () => {
    try {
      const newData = {
        temperature: 25,
        humidity: 60,
        windSpeed: 10,
        weatherDescription: 'Partly cloudy',
      };
      await axios.post('/api/data', newData);
      fetchWeatherData();
    } catch (error) {
      console.error('Error adding weather data:', error);
    }
  };

  const handleUpdateData = async (id) => {
    try {
      const updatedData = {
        temperature: 30,
        humidity: 70,
        windSpeed: 15,
        weatherDescription: 'Sunny',
      };
      await axios.put(`/api/data/${id}`, updatedData);
      fetchWeatherData();
    } catch (error) {
      console.error('Error updating weather data:', error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`/api/data/${id}`);
      fetchWeatherData();
    } catch (error) {
      console.error('Error deleting weather data:', error);
    }
  };

  const handleFetchWeatherStack = async () => {
    try {
      const response = await axios.get('/api/weatherstack');
      setWeatherData([...weatherData, response.data]);
    } catch (error) {
      console.error('Error fetching WeatherStack data:', error);
    }
  };

  const handleFetchWeatherApi = async () => {
    try {
      const response = await axios.get('/api/weatherapi');
      setWeatherData([...weatherData, response.data]);
    } catch (error) {
      console.error('Error fetching WeatherAPI data:', error);
    }
  };

  const handleFetchTomorrowIo = async () => {
    try {
      const response = await axios.get('/api/tomorrowio');
      setWeatherData([...weatherData, response.data]);
    } catch (error) {
      console.error('Error fetching Tomorrow.io data:', error);
    }
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <button onClick={handleAddData}>Add Data</button>
      <button onClick={handleFetchWeatherStack}>Fetch WeatherStack Data</button>
      <button onClick={handleFetchWeatherApi}>Fetch WeatherAPI Data</button>
      <button onClick={handleFetchTomorrowIo}>Fetch Tomorrow.io Data</button>
      <ul>
        {weatherData.map((data) => (
          <li key={data._id}>
            <p>Temperature: {data.temperature}</p>
            <p>Humidity: {data.humidity}</p>
            <p>Wind Speed: {data.windSpeed}</p>
            <p>Weather Description: {data.weatherDescription}</p>
            <button onClick={() => handleUpdateData(data._id)}>Update</button>
            <button onClick={() => handleDeleteData(data._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;