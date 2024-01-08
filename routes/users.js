var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Customer = require('./model/customer');



/* GET users listing. */
router.post('/submit-form', async (req, res) => {
  try {
    // Create a new customer instance using the submitted form data
    console.log("before try block", req.body);
    console.log("sss",req.body.customerName);
    const newCustomer = new Customer({
      customerName: req.body.customerName,
      customerNumber: req.body.customerNumber,
      vehicleType: req.body.vehicleType,
    });

    // Save the customer data to the database
    await newCustomer.save();
    console.log("the form value is submitted", newCustomer)

    res.status(201).send('Form submitted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/getCustomerName/:customerNumber', async(req,res)=>{
  try {
    const { customerNumber } = req.params;

    // Find the customer in the database by customer number
    const customer = await Customer.findOne({ customerNumber });

    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Star

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
