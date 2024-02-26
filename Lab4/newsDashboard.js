import React, { useState, useEffect } from 'react';
import Section from './Section';
import axios from 'axios';

function NewsDashboard() {
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState({});
  const [otherNews, setOtherNews] = useState([]);

  useEffect(() => {
    const fetchNewsAndWeather = async () => {
      try {
        const newsResponse = await axios.get('/articles.json');
        setNews(newsResponse.data);

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
      <Section title="Weather" items={[weather]} />
      <Section title="Other News" items={otherNews} />
    </div>
  );
}

export default NewsDashboard;
