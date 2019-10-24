const config = require('../config/config');
const Movie = require('mongoose').model(config.tomatoModelName);
const logger = require('./logger');

const renameField = async (fromName, toName) => {
    let update = { $rename : {fromName: `${toName}`} };
    let filter = {rank: {$exists: true}}
    result = await Movie.updateMany(filter, update);
    logger.info({Modified: (result.nModified===1? 'yes': 'no')});
    return result;
}

module.exports = {renameField};

// const addField = async