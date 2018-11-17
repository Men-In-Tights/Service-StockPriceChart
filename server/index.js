const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { PriceDataDay } = require('../database/PriceDataDay.js');
const db = require('../database/index.js');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));


app.get('/api/symbol/:id/day', (req, res) => {
  const { id } = req.params;
  PriceDataDay.find({ id }, null, { sort: { date: 1 } }, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/api/symbol/:id/week', (req, res) => {
  const { id } = req.params;
  PriceDataDay.find({ id }, null, { sort: { date: 1 } }, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.get('/pricechart/company/:id', (req, res) => {
  const { id } = req.params;
  PriceDataDay.find({ id }, null, { sort: { date: 1 } }, (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(results);
    }
  });
});

app.patch('/pricechart/company/:id/:priceUpdate', (req, res) => {
  const { id } = req.params;
  const { priceUpdate } = req.params;
  PriceDataDay.findByIdAndUpdate({ _id: id }, { $set: { price: priceUpdate } }, { new: true }, 
    (error, results) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(results);
      }
    });
});

app.delete('/pricechart/company/:id', (req, res) => {
  const { id } = req.params;
  PriceDataDay.findOneAndRemove({ _id: id }, (error) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send('Record Deleted');
    }
  });
});

app.use('/stockprice', express.static(path.join(__dirname, '/../client/dist')));
app.get('/stockprice/:id', (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
