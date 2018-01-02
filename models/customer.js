const mongoose = require('mongoose');

// Customer Schema
const customerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true }
});

// Define and export
module.exports = mongoose.model('Customer', customerSchema);