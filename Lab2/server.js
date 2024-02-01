const express = require('express')
const app = express()
const port = 3000
import { json } from 'body-parser'
const articles = require('../articles.json');
const cors = require('cors')
// const env = require('dotenv')

// env.config();

// const apiKey = process.env.NEWS_API_KEY

app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/NewsTicker', express.static('./static'));

app.get('/articles',(req,res) =>{
    res.json(articles)
})

app.listen(port, () => {
	console.log('Listening on *:3000')
})