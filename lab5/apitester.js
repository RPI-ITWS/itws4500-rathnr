import React, { useState } from 'react';
import axios from 'axios';

function ApiTester() {
  const [number, setNumber] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');

  const handleRequest = async (verb) => {
    try {
      const url = number ? `/db/${number}` : '/db';
      const requestConfig = {
        method: verb,
        url: url,
        data: body,
      };

      const response = await axios(requestConfig);
      setResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResponse(JSON.stringify(error.response.data, null, 2));
    }
  };

  return (
    <div className="section">
      <input
        type="text"
        placeholder="Number (:number)"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <textarea
        placeholder="Request Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div>
        <button onClick={() => handleRequest('get')}>GET</button>
        <button onClick={() => handleRequest('post')}>POST</button>
        <button onClick={() => handleRequest('put')}>PUT</button>
        <button onClick={() => handleRequest('delete')}>DELETE</button>
      </div>
      <pre>{response}</pre>
    </div>
  );
}

export default ApiTester;