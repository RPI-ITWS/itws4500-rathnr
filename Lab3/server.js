const express = require('express');
const fs = require('fs');
const cors = require('cors');
const axios = require('axios');

// Initialize the express application
const app = express();
app.use(express.json());
app.use(cors()); // Make sure to use cors if you're calling this server from a different origin

let newsArticles = [];

// Read news articles from a local file
try {
  const data = fs.readFileSync('./articles.json', 'utf8');
  newsArticles = JSON.parse(data);
} catch (err) {
  console.error("Error reading the articles file:", err);
}

const PORT = process.env.PORT || 3000;

// Define API endpoints
app.get('/articles', (req, res) => {
  res.json(newsArticles); // Send the loaded articles as a response
});

app.get('/news-and-weather', async (req, res) => {
  const city = req.query.city || 'London';
  const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);
  const otherData = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=2');

  res.json({
    news: newsArticles,
    weather: weatherData.data,
    other: otherData.data
  });
});

app.post('/add-weather-to-news', async (req, res) => {
  const { city, articleId } = req.body;
  const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`);

  const articleIndex = newsArticles.findIndex(article => article.id === articleId);
  if (articleIndex === -1) {
    return res.status(404).send('Article not found');
  }

  // Add weather data to the specified article
  newsArticles[articleIndex].weather = weatherData.data;
  res.status(200).json(newsArticles[articleIndex]);
});

app.put('/update-article/:id', async (req, res) => {
  const { id } = req.params;
  const otherData = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const articleIndex = newsArticles.findIndex(article => article.id === parseInt(id));
  if (articleIndex === -1) {
    return res.status(404).send('Article not found');
  }

  // Update the article content with data from the external API
  newsArticles[articleIndex].content = otherData.data.body;
  res.status(200).json(newsArticles[articleIndex]);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
