const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const cors = require('cors');
// const env = require('dotenv')

// env.config();

// const apiKey = process.env.NEWS_API_KEY

const data = fs.readFileSync('./articles.json');

const articles = JSON.parse(data);


app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/NewsTicker', express.static('./static'));

app.get('/articles',(req,res) =>{
    res.json(articles)
})

app.put('/articles/put', (req, res) => {
    let putJson = {
        "response": "You put something"
    };
    res.json(putJson);
});

app.post('/articles/post', (req, res) => {
    let postJson = {
        "response": "You posted something"
    };
    res.json(postJson);
});

app.delete('/articles/delete', (req, res) => {
    let deleteJson = {
        "response": "You deleted something"
    };
    res.json(deleteJson);
});

app.listen(port, () => {
	console.log('Listening on *:3000')
})