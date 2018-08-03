const express = require('express');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const DB_URL = 'mongodb://localhost/interlink-meetup-tutor';
mongoose.connect(DB_URL, function (err) {
  if (err) {
    console.error('Mongo connection FAIL: ' + err)
  } else {
    console.log('Mongo connection OK')
  }
});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(router);

module.exports = app;