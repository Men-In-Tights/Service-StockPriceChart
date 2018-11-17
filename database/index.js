// const mongoose = require('mongoose');

// const mongoUri = 'mongodb://localhost/pricedataday';
// const db = mongoose.connect(mongoUri);

// module.exports = db;

const { Client } = require('pg');

const client = new Client({
  user: 'sysadmin',
  host: '127.0.0.1',
  database: 'pricedata',
  password: '',
  port: '5432',
});

client.connect((err) => {
  if (err) {
    console.error('Connection Error', err);
  } else {
    console.log('Connected');
  }
});

module.exports = client;
