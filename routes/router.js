const express = require('express');
const {scrapeTomatoByYear , scrapeYoutube } = require("../controllers/scrape");
const { validate, validationRules } = require('../helpers/validation');
const { health }  = require('../controllers/health');
const { updateManyCont } = require('../controllers/DB/updateMany');

const routes = () => {
    const router = express.Router();

    router.get('/health', health);
    router.put('/db/updateMany', validationRules('updateManyCont'), validate, updateManyCont);

    router.get('/scrapeTrailers', scrapeYoutube);
    router.post('/scrape', validationRules('scrapeTomato'), validate, scrapeTomatoByYear);

return router;
};

module.exports = routes;