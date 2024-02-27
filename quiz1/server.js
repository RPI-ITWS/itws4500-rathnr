const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/get-activity', async (req, res) => {
    const { type, participants, price, accessibility } = req.query;
    let apiUrl = 'https://www.boredapi.com/api/activity';

    if (type) {
        apiUrl += `?type=${type}`;
        if (participants) {
            apiUrl += `&participants=${participants}`;
        }
        if (price) {
            apiUrl += `&price=${price}`;
        }
        if (accessibility) {
            apiUrl += `&accessibility=${accessibility}`;
        }
    }

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching activity:', error);
        res.status(500).send('Error fetching activity');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
