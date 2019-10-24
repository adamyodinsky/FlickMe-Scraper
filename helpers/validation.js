const { body, validationResult } = require('express-validator');
const logger = require('../helpers/logger');

const validationRules = (method) => {
  switch (method) {
    case 'scrapeTomato': {
      return [
        body('range.start', 'range.start required').not().isEmpty(),
        body('range.end', 'range.end required').not().isEmpty(),
        body('collection', 'collection required').not().isEmpty()
      ]
    }
    case 'updateManyCont': {
      return [
        body('filter', 'filter required').not().isEmpty(),
        body('update', 'update required').not().isEmpty(),
        body('options', 'options required').not().isEmpty()
      ]
    }
  }
};


const validate = (req, res, next) => {
  // validate
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  // make an array of errors messages
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));


  logger.error(extractedErrors);

  return res.status(422).json({
    errors: extractedErrors,
  })
};


module.exports = {
  validationRules,
  validate,
};

