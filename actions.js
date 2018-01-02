const mongoose = require('mongoose');
const Customer = require('./models/customer');

mongoose.connect('mongodb://localhost:27017/cli');

function printCustomer(customer) {
  let str =  `ID: ${customer._id}\n`;

  str +=  `First Name: ${customer.firstName}\n`;
  str +=  `Last Name: ${customer.lastName}\n`;
  str +=  `Phone Number: ${customer.phone}\n`;
  str +=  `Email Address: ${customer.email}\n`;

  console.info(str);
}

function errorHandler(error) {
  error.message ? console.error(error.message) : console.error(error);
  process.exit(1);
}

function add(customer) {
  Customer.create(customer)
    .then(customer => {
      console.info('New Customer Added');
      printCustomer(customer);
      mongoose.disconnect();
    })
    .catch(error => errorHandler(error));
}

function find(name) {
  const search = new RegExp(name, 'i');
  Customer.find({$or: [{firstName: search}, {lastName: search}]})
    .then(customers => {
      if (customers.length) {
        customers.forEach(customer => printCustomer(customer));
        console.info(`${customers.length} Matches Found`);
      }
      else {
        console.info(`No Matches Found`);
      }
      mongoose.disconnect();
    })
    .catch(error => errorHandler(error));
}

function update(_id, customer) {
  Customer.update({ _id }, customer)
    .then(customer => {
      console.info('Customer Updated');
      printCustomer(customer);
      mongoose.disconnect();
    })
    .catch(error => errorHandler(error));
} 

function remove(_id) {
  Customer.remove({ _id })
    .then(customer => {
      console.info('Customer Removed');
      printCustomer(customer);
      mongoose.disconnect();
    })
    .catch(error => errorHandler(error));
}

function list() {
  Customer.find()
    .then(customers => {
      if (customers.length) {
        customers.forEach(customer => printCustomer(customer));
        console.info(`${customers.length} Customers Found`);
      }
      else {
        console.info(`No Customers Found`);
      }
      mongoose.disconnect();
    })
    .catch(error => errorHandler(error));
}

// Export All Methods
module.exports = { add, find, update, remove, list };