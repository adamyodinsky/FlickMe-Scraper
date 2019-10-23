const config = require('../config/config');
const Movie = require('mongoose').model(config.tomatoModelName);
const logger = require('../helpers/logger');

const renameField = async (fromName, toName) => {


    try {
        let update = { $rename : {fromName: `${toName}`} };
        let filter = {rank: {$exists: true}}
        result = await Movie.updateMany(filter, update);
        logger.info({Modified: (result.nModified===1? 'yes': 'no')});
    } catch (e) {
        logger.error(e);
    }
}

const addField = async