var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');
// const cors = require('cors');
// var app = express();
// const corsOptions = {
//   origin: ['https://apac-01.workspaces.avayacloud.com', 'https://demoapp.sysgrate.com'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // enable passing of cookies, if applicable
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect('mongodb+srv://akshayjai19001900:Akshay_2001@cluster0.fy17wn5.mongodb.net/CRM', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
  }, { timestamps: true });
  
  // Create a Mongoose model
  const Location = mongoose.model('Location', locationSchema);

  router.get('/latest-location/:contactId', async (req, res) => {
    try {
      const { contactId } = req.params;
  
      // Find locations based on the provided contactId
      const locations = await Location1.find({ contactId });
  
      if (locations.length === 0) {
        return res.status(404).json({ message: 'No locations found for the specified contactId' });
      }
  
      res.status(200).json({ message: 'Locations retrieved successfully', locations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  const contactSchema = new mongoose.Schema({
    contactId: String,
    // Add other fields as needed
  });
  
  const Contact = mongoose.model('Contact', contactSchema);

  router.post('/saveContact', async (req, res) => {
    try {
      const  contactId = req.body;
      const newContact = new Contact(contactId);
      await newContact.save();
      console.log("the saved contact", contactId);
      res.json({ success: true, message: 'Contact saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error saving contact' });
    }
  });

  router.get('/getContactId', async (req, res) => {
    try {
      // Assuming you want to retrieve the most recently saved contactId
      const latestContact = await Contact.findOne().sort({ _id: -1 });
  
      if (!latestContact) {
        return res.status(404).json({ success: false, message: 'No contact found' });
      }
  
      const latestContactId = latestContact.contactId;
  
      res.json({ success: true, contactId: latestContactId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error getting contactId' });
    }
  });

  const locationSchema1 = new mongoose.Schema({
    contactId: String,
    latitude1: Number,
    longitude1: Number,
     // Add the new field
  });
  
  const Location1 = mongoose.model('Location1', locationSchema1);

  router.post('/saveLocation', async (req, res) => {
    try {
      console.log("Before saving contact log", req.body)
      const { contactId ,latitude1, longitude1, } = req.body;
      
      const newLocation = new Location1({
        contactId,
        latitude1,
        longitude1,
      });
      
      await newLocation.save();
      console.log("The save location to db is working", newLocation)
      res.status(200).json({ message: 'Location saved successfully' });
    } catch (error) {
      console.error(error);
      console.log("The save location to db has some error please fix it developer")
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/checkContactId/:contactId', async (req, res) => {
    try {
      const  contactId  = req.params;
      const location = await Location1.findOne( contactId );
  
      console.log("Before condition", contactId);
      console.log("for location:::", location);
      if (!location) {
        console.log(":The log for check contact id",contactId )
        return res.status(404).json({ message: 'ContactId not found' });
      }
      console.log(":The log for check contact id",contactId )
      res.status(200).json({ message: 'ContactId found', location });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/getLatestData', async (req, res) => {
    const uri = 'mongodb+srv://akshayjai19001900:Akshay_2001@cluster0.fy17wn5.mongodb.net/CRM'; // Replace with your MongoDB connection URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      console.log('Connecting to MongoDB...');
      await client.connect();
  
      const database = client.db('CRM');
      const collection = database.collection('users');
  
      // Find the latest document
      const latestUser = await collection.findOne({}, { sort: { _id: -1 } });
  
      if (latestUser) {
        console.log('Latest user found:', latestUser);
        res.status(200).json(latestUser);
      } else {
        console.log('No user found');
        res.status(404).json({ error: 'No user found' });
      }
    } catch (error) {
      console.error('Error fetching latest user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  });
  

  module.exports = router;