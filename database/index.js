// const mongoose = require('mongoose');

// const mongoUri = 'mongodb://localhost/pricedataday';
// const db = mongoose.connect(mongoUri);

// module.exports = db;

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: '',
  port: '5432',
});

pool.connect((err) => {
  if (err) {
    console.error('Connection Error', err);
  } else {
    console.log('Connected to pg database');
  }
});

module.exports = pool;
