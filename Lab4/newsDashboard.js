import React, { useState, useEffect } from 'react';
import Section from './Section';
import axios from 'axios';

function NewsDashboard() {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState({});
  const [otherNews, setOtherNews] = useState([]);

  useEffect(() => {
    // Fetch news, weather, and other news data
    // This is a simplified example, you'll need to adapt it based on how your backend is set up
    const fetchNewsAndWeather = async () => {
      try {
        const newsResponse = await axios.get('/articles');
        setNews(newsResponse.data);

        // Assuming you have endpoints like these or you might need to adapt based on your actual API
        const weatherResponse = await axios.get('/weather?city=London');
        setWeather(weatherResponse.data);

        const otherNewsResponse = await axios.get('/other-news');
        setOtherNews(otherNewsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchNewsAndWeather();
  }, []);

  return (
    <div>
      <Section title="Articles" items={news} />
      <Section title="Weather" items={[weather]} /> {/* Weather might not be an array, adjust as needed */}
      <Section title="Other News" items={otherNews} />
    </div>
  );
}

export default NewsDashboard;
