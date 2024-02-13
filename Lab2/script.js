document.addEventListener('DOMContentLoaded', function() {
    fetchArticles();
    fetchWeatherAndNews();
});

async function fetchArticles() {
    const response = await fetch('/articles');
    const articles = await response.json();
    const articlesDiv = document.getElementById('articles');
    articles.forEach(article => {
        const div = document.createElement('div');
        div.className = 'article';
        div.innerHTML = `<h2>${article.Title}</h2><p>${article.Description}</p><a href="${article.Link}" target="_blank">Read more</a>`;
        articlesDiv.appendChild(div);
    });
}

async function fetchWeatherAndNews(city = 'London') {
    const response = await fetch(`/news-and-weather?city=${city}`);
    const data = await response.json();
    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `<h2>Weather in ${city}</h2><p>Temperature: ${data.weather.main.temp}°C</p><p>Description: ${data.weather.weather[0].description}</p>`;

    const otherNewsDiv = document.getElementById('other-news');
    data.other.forEach(post => {
        const div = document.createElement('div');
        div.className = 'other-news-item';
        div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
        otherNewsDiv.appendChild(div);
    });
}
