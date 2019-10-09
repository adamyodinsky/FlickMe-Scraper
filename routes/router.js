const express = require('express');
const scrape = require("../controllers/scrape");
const { validate, validationRules } = require('../helpers/validation');
const healthController = require('../controllers/health');

const routes = () => {
    const router = express.Router();
    router.get('/health', healthController.health);
    router.post('/scrape', validationRules('scrape'), validate, scrape.scrapeTomatoByYear);

return router;
};

module.exports = routes;