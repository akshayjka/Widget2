const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName: { type: String,  },
    customerNumber: { type: String,  },
  vehicleType: { type: String, },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
