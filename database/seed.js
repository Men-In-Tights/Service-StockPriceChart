const faker = require('faker');
const fs = require('fs');
const path = require('path');
const Moment = require('moment');
const Promise = require('bluebird');
const { Client } = require('./index.js');


const stockStream = fs.createWriteStream(path.join(__dirname, 'company.csv'));
const companyGenerator = (index) => {
  for (let i = index; i < 10000000; i += 1) {
    const name = faker.company.companyName().split(',').join('');
    const owner = faker.random.number({ min: 100, max: 900 });
    const rating = faker.random.number({ min: 1, max: 85 });
    if (!stockStream.write(`${name},${owner},${rating}\n`)) {
      stockStream.once('drain', () => companyGenerator(i + 1));
      return;
    }
  }
  stockStream.end();
};

const stockStream2 = fs.createWriteStream(path.join(__dirname, 'pricesOneDay.csv'));
const priceGenerator = (index) => {
  const year = 2018;
  const month = 10;
  for (let day = 28; day <= 28; day += 1) {
    for (let i = index; i <= 1000000; i += 1) {
      for (let hour = 9; hour <= 16; hour += 1) {
        for (let minute = 0; minute < 60; minute += 5) {
          const price = Number(faker.finance.amount(100, 900, 2));
          const datetime = Moment().format(`${year}-${month}-${day} ${hour}:${minute}:00`);
          const company_Id = i;
          if (!stockStream2.write(`${price},${datetime},${company_Id}\n`)) {
            stockStream2.once('drain', () => priceGenerator(i + 1));
            return;
          }
        }
      }
    }
  }
  stockStream2.end();
};

const gen = Promise.resolve(companyGenerator(0));
gen.then(() => {
  Promise.resolve(priceGenerator(1));
}).then(() => {
  const query = `copy pricedata.company(name, owner, rating) from 'path.join(__dirname, company.csv)' delimiters ',' CSV`;
  Client.query(query, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Success');
    }
  });
}).then(() => {
  const query = `copy pricedata.prices(price, datetime, company_Id) from 'path.join(__dirname, pricesOneDay.csv)' delimiters ',' CSV`;
  Client.query(query, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Success');
    }
  });
})
  .catch((error) => {
    if (error) {
      console.log('There\'s been a write error', error);
    }
  });

// const db = require('./index.js');
// const { PriceDataDay } = require('./PriceDataDay.js');

// const stockPriceDay = () => {
//   const result = [];

//   for (let id = 0; id < 121; id += 1) {
//     const symbol = faker.finance.currencyCode();
//     const name = faker.company.companyName();
//     const owner = faker.random.number({ min: 100, max: 900 });
//     const rating = faker.random.number({ min: 1, max: 85 });

//     for (let hour = 9; hour <= 18; hour += 1) {
//       for (let minute = 0; minute <= 60; minute += 5) {
//         const price = Number(faker.finance.amount(100, 900, 2));
//         const d = new Date(2018, 9, 25, hour, minute);
//         const date = d.toString();
//         result.push({
//           id, symbol, name, price, owner, rating, date,
//         });
//       }
//     }
//   }

//   return result;
// };

// const insertStockPriceDay = (dataFunction) => {
//   PriceDataDay.create(dataFunction())
//     .then(() => db.disconnect());
// };

// insertStockPriceDay(stockPriceDay);