const express = require('express');

const app = express();

require('./loaders/express')(app);
require('./loaders/routes')(app);
require('./loaders/errorHandlers')(app);

module.exports = app;
