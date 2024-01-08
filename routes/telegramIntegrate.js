const express = require('express');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
var router = express.Router();
const app = express();
const port = 3000;

// Parse JSON bodies
router.post('/send-telegram-message', async (req, res) => {
    try {
      const text = req.body.text || 'Default text'; // Use the provided text or a default one
  
      // Dynamic import of 'node-fetch'
      const fetchModule = await import('node-fetch');
      const fetch = fetchModule.default || fetchModule;
  
      // Now you can use 'fetch' here
      const myHeaders = new fetch.Headers();
      myHeaders.append('Content-Type', 'application/json');
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };
  
      const response = await fetch(`https://v1.nocodeapi.com/akshay_j/telegram/DQiytSKLTJqHmnSe/sendText?text=${text}`, requestOptions);
      const result = await response.text();
  
      // You can handle the result or send a success message back to the client
      console.log("The telegram", text)
      res.status(200).json({ message: 'Telegram message sent successfully', data: result });
    } catch (error) {
      // Handle errors and send an error response
      console.error(error);
      console.log("The telegram", text)
      res.status(500).json({ message: 'Error sending Telegram message', error: error.message });
    }
  });
  
  module.exports = router;