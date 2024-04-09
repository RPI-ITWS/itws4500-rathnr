const axios = require('axios');
const d3 = require('d3');

async function fetchFromWeatherStack() {
  try {
    const response = await axios.get('http://api.weatherstack.com/current', {
      params: {
        access_key: 'ce698321ea5516bfa393219914782330',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from WeatherStack:', error);
    return null;
  }
}

async function fetchFromTomorrowIo() {
  try {
    const response = await axios.get('https://api.tomorrow.io/v4/weather/forecast', {
      params: {
        location: '42.3478,-71.0466',
        apikey: 'CWvhHWXs7Y1amXpdVCetrS2jXVmLFTLS',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Tomorrow.io:', error);
    return null;
  }
}

async function main() {
  const weatherStackData = await fetchFromWeatherStack();
  const tomorrowIoData = await fetchFromTomorrowIo();

  if (weatherStackData && tomorrowIoData) {
    console.log('WeatherStack data:', weatherStackData);
    console.log('Tomorrow.io data:', tomorrowIoData);
    
    
    const temperatureData = weatherStackData.current.temperature;

    const weatherCount = {
      rainy: tomorrowIoData.rain,
      sunny: tomorrowIoData.sun,
      cloudy: tomorrowIoData.cloud,
    };

    console.log('Temperature Data:', temperatureData);
    console.log('Weather Count:', weatherCount);
  }
}

main();
