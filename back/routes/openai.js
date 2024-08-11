const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    const maxRetries = 5;
    const initialDelay = 5000;

    console.log('Received prompt:', prompt);
    console.log('Using API Key:', OPENAI_API_KEY);

    // const makeRequest = async (retries = 0, delay = initialDelay) => {
    //     try {
    //         const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    //             model: 'gpt-4-turbo', 
    //             messages: [{ role: 'user', content: prompt }],
    //             max_tokens: 800
    //         }, {
    //             headers: {
    //                 'Authorization': `Bearer ${OPENAI_API_KEY}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         return response.data;
    //     } catch (error) {
    //         if (error.response) {
    //             console.log(`Error response from OpenAI API:`, error.response.data);
    //             if (error.response.status === 429 && retries < maxRetries) {
    //                 console.log(`Too many requests, retrying after a delay of ${delay / 1000} seconds...`);
    //                 await new Promise(resolve => setTimeout(resolve, delay));
    //                 return makeRequest(retries + 1, delay * 2);
    //             }
    //         } else {
    //             console.error('Error connecting to OpenAI API:', error.message);
    //         }
    //         throw error;
    //     }
    };

    try {
        const data = await makeRequest();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error connecting to OpenAI API');
    }
});

module.exports = router;



