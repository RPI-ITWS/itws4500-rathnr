import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [apiName, setApiName] = useState('');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get('/quiz2');
      setQuotes(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchQuoteById = async (id) => {
    try {
      const response = await axios.get(`/quiz2/${id}`);
      setSelectedQuote(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addQuote = async () => {
    try {
      await axios.post('/quiz2', { apiName });
      fetchQuotes();
      setApiName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateQuote = async (id, updatedQuote) => {
    try {
      await axios.put(`/quiz2/${id}`, updatedQuote);
      fetchQuotes();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteQuote = async (id) => {
    try {
      await axios.delete(`/quiz2/${id}`);
      fetchQuotes();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Quotes</h1>
      <div>
        <input
          type="text"
          placeholder="Enter API name"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
        />
        <button onClick={addQuote}>Add Quote</button>
      </div>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            <p>{quote.quote}</p>
            <p>Author: {quote.author}</p>
            <button onClick={() => fetchQuoteById(quote.id)}>View</button>
            <button onClick={() => updateQuote(quote.id, { author: 'Updated Author' })}>
              Update
            </button>
            <button onClick={() => deleteQuote(quote.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedQuote && (
        <div>
          <h2>Selected Quote</h2>
          <p>{selectedQuote.quote}</p>
          <p>Author: {selectedQuote.author}</p>
        </div>
      )}
    </div>
  );
}

export default App;