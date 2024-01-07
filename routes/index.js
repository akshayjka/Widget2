var express = require('express');
var router = express.Router();
const axios = require('axios');

axios({
    method: 'post',
    url: 'https://v1.nocodeapi.com/akshay_j/telegram/DQiytSKLTJqHmnSe/sendText?text=Hello', 
    params: {},
}).then(function (response) {
        // handle success
        console.log(response.data);
}).catch(function (error) {
        // handle error
        console.log(error);
})

const TeleSignSDK = require('telesignsdk');

// Replace the defaults below with your Telesign authentication credentials or pull them from environment variables.


// Set the message text and type.
const message = "Your package has shipped! Follow your delivery at https://vero-finto.com/orders/3456";
const messageType = "ARN";

// Instantiate a messaging client object.

const customerId = "EA314334-B4C5-4603-B223-F1391DA53DA4"
const apiKey = "nXT4s8X3egPy/G4ZPg4gN9doZKgkTLIsf5iy+JwKH08/hij98d/pzk0ZRr77Jt3R6wIlc4XNjr9OlklFYMsfKw=="
 
const client = new TeleSignSDK( customerId, apiKey);

router.post('/send-sms', (req, res) => {
  const { phoneNumber, message, messageType } = req.body;

  function smsCallback(error, responseBody) {
    if (error === null) {
      console.log('\nResponse body:\n' + JSON.stringify(responseBody));
      res.status(200).json(responseBody);
    } else {
      console.error('Unable to send SMS. Error:\n\n' + error);
      res.status(500).json({ error: 'Unable to send SMS' });
    }
  }

  client.sms.message(smsCallback, phoneNumber, message, messageType);
});

// function to get location.........

router.post('/save-id', (req,res) => {
  
})

/* GET home page. */
router.get('/get', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
