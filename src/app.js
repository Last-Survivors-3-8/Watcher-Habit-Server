require('dotenv').config();
const express = require('express');
const connectDB = require('./configs/database');

const app = express();

connectDB();

require('./loaders/express')(app);
require('./loaders/routes')(app);
require('./loaders/errorHandlers')(app);

module.exports = app;
