const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://rathnr:WDdsIcbawDYGrMRV@quotesdb.fd5oeii.mongodb.net/, { useNewUrlParser: true, useUnifiedTopology: true });

const quoteSchema = new mongoose.Schema({
  id: Number,
  author: String,
  quote: String
});


const Quote = mongoose.model('Quote', quoteSchema);

const app = express();
app.use(express.json());
app.use(cors());

function extractQuoteData(apiResponse, apiName) {
  let quoteText = '';
  let quoteAuthor = '';

  switch (apiName) {
    case 'quoteGarden':
      quoteText = apiResponse.data[0].quoteText;
      quoteAuthor = apiResponse.data[0].quoteAuthor;
      break;
    case 'forismatic':
      quoteText = apiResponse.quoteText;
      quoteAuthor = apiResponse.quoteAuthor;
      break;
    case 'quotesOnDesign':
      quoteText = apiResponse[0].content.rendered;
      quoteAuthor = apiResponse[0].title.rendered;
      break;
  }

  return { quoteText, quoteAuthor };
}

// ETL pipeline function
async function runETLPipeline(apiName) {
  try {
    let apiUrl = '';
    let params = {};

    switch (apiName) {
      case 'quoteGarden':
        apiUrl = 'https://quote-garden.onrender.com/api/v3/quotes/random';
        break;
      case 'forismatic':
        apiUrl = 'http://api.forismatic.com/api/1.0/';
        params = {
          method: 'getQuote',
          format: 'json',
          lang: 'en',
        };
        break;
      case 'quotesOnDesign':
        apiUrl = 'https://quotesondesign.com/wp-json/wp/v2/posts/';
        params = {
          orderby: 'rand',
        };
        break;
    }

    const response = await axios.get(apiUrl, { params });
    const { quoteText, quoteAuthor } = extractQuoteData(response.data, apiName);

    const count = await Quote.countDocuments();
    const newQuote = new Quote({
      id: count + 1,
      author: quoteAuthor,
      quote: quoteText
    });

    await newQuote.save();
    console.log('Quote saved successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

// API endpoints
app.get('/quiz2', async (req, res) => {
  try {
    const quotes = await Quote.find({}, { _id: 0, __v: 0 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/quiz2/:number', async (req, res) => {
  try {
    const number = parseInt(req.params.number);
    const quote = await Quote.findOne({ id: number }, { _id: 0, __v: 0 });

    if (!quote) {
      res.status(404).json({ message: 'Quote not found' });
    } else {
      res.json(quote);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/quiz2', async (req, res) => {
  try {
    const apiName = req.body.apiName;
    await runETLPipeline(apiName);
    res.status(201).json({ message: 'Quote added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/quiz2/:number', (req, res) => {
  const number = parseInt(req.params.number);
  res.status(405).json({ message: 'Method not allowed' });
});

app.put('/quiz2', async (req, res) => {
  try {
    const updateData = req.body;
    await Quote.updateMany({}, updateData);
    res.json({ message: 'All quotes updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/quiz2/:number', async (req, res) => {
  try {
    const number = parseInt(req.params.number);
    const updateData = req.body;
    const result = await Quote.updateOne({ id: number }, updateData);

    if (result.nModified === 0) {
      res.status(404).json({ message: 'Quote not found' });
    } else {
      res.json({ message: 'Quote updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/quiz2', async (req, res) => {
  try {
    await Quote.deleteMany({});
    res.json({ message: 'All quotes deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/quiz2/:number', async (req, res) => {
  try {
    const number = parseInt(req.params.number);
    const result = await Quote.deleteOne({ id: number });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Quote not found' });
    } else {
      res.json({ message: 'Quote deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});