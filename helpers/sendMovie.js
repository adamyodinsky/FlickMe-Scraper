const logger  = require('../helpers/logger');
const config  = require('../config/config');
const request = require('request-promise-native');

let host = config.dbManagerHost;
let port = config.dbManagerPort;
let api  = config.dbManagerApi;




const sendMovie = (movie) => {
  const options = {
    method: 'POST',
    uri: `${host}:${port}/${api}/catalog/movie`,
    json: true,
    body: {
      movie: movie,
      collection: 'tomato'
    }
  };

  try {
    request(options);
  } catch (error) {
    logger.error(error.message);
  }

};

