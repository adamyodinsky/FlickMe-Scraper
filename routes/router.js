const express = require('express');
const {scrapeTomatoByYear , scrapeYoutube } = require("../controllers/scrape");
const { validate, validationRules } = require('../helpers/validation');
const { health }  = require('../controllers/health');
const { renameFieldCont } = require('../controllers/DB/field');

const routes = () => {
    const router = express.Router();

    router.get('/health', health);
    router.put('/db/field', renameFieldCont);
    router.post('/db/field');

    router.get('/scrapeTrailers', scrapeYoutube);
    router.post('/scrape', validationRules('scrapeTomato'), validate, scrapeTomatoByYear);

return router;
};

module.exports = routes;