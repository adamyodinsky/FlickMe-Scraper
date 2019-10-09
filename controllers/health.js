const logger = require('../helpers/logger');
const config = require('../config/config');
const mongoose = require('mongoose');
// require('./app.js');

const health = async (req, res) => {
  const mongoState = mongoose.connection.readyState;

  if (mongoState === 1) {
    res.status(200).json('OK');
    logger.info({status: 200, body: 'OK'});
  } else {
    res.status(500).json({mongoState: mongoState, scraperState: "UP"});
    logger.info({mongoState: mongoState, scraperState: "UP"});
  }
};

module.exports =  { health } ;