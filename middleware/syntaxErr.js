const logger  = require('../helpers/logger');

const syntaxErr = (error, req, res, next) => {
  if(error instanceof SyntaxError){ //Handle SyntaxError here.
    logger.error("Invalid data, SyntaxError: " + error.message);
    return res.status(500).json("Invalid data, SyntaxError: " +  error.message);
  } else {
    next();
  }
};

module.exports = syntaxErr;