const express = require('express');
const {scrapeTomatoByYear , scrapeYoutube } = require("../controllers/scrape");
const { validate, validationRules } = require('../helpers/validation');
const healthController = require('../controllers/health');

const routes = () => {
    const router = express.Router();

    router.get('/health', healthController.health);
    router.get('/scrapeTrailers', scrapeYoutube);
    router.post('/scrape', validationRules('scrapeTomato'), validate, scrapeTomatoByYear);

return router;
};

module.exports = routes;