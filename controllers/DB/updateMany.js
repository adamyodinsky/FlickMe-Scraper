const logger = require('../../helpers/logger');
const config = require('../../config/config');
const Movie = require('mongoose').model(config.tomatoModelName);


const updateManyCont = async (req, res) => {
    const filter  = req.body.filter;
    const update = req.body.update;
    const options = req.body.options;
    
    try {
        result = await Movie.updateMany(filter, update, options);
        res.status(200).json(result);
        logger.info(result);
    } catch (error) {
        res.status(500).json('Internal Server Error');
        logger.error(error.message);
    }
}

module.exports = { updateManyCont } 
