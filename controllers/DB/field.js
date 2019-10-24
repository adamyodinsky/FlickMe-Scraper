const logger = require('../../helpers/logger');
const config = require('../../config/config');
const { renameField } = require('../../helpers/renameField');

const renameFieldCont = (req, res) => {
    const fromName  = req.body.fromName;
    const toName = req.body.toName;
    
    try {
        const result = renameField(fromName, toName);
        res.status(200).json(result);
        logger.info(result);
    } catch (error) {
        res.status(500).json('Internal Server Error');
        logger.error(error.message);
    }
}

module.exports = { renameFieldCont } 