const logger  = require('../helpers/logger');
const scrape  = require('../scraper/tomatoScraper').superCrawler;
const { youtubeScraper } = require('../scraper/youtubeScraper');
const { scrapeGenreTopMovies } = require('../scraper/tomatoScraperGenre');
//TODO a function that choose a scraper by body.collection


const scrapeTomatoByYear = async (req, res) => {

  const { range, collection }  = req.body;

  if (Number(range.start) < 1920) {
    logger.warn("Please choose Start value from 1920 and above.");
    return;
  }

  // start scraping
  //TODO after scraping finished, send to a webhook api about scraping ended status
  try {
    res.status(202).json({range: range, collection: collection, status: "Scraping request Accepted"});
    await scrape(range);
  } catch (error) {
    logger.error(error.message);
  }
};

const scrapeYoutube = async (req, res) => {

    try {
        res.status(202).json('scraping request has been accepted');
        await youtubeScraper();
    } catch (e) {
        logger.error(e.message);
    }
};

const scrapeTopGenres = async (req, res) => {
  res.status(202).json('scraping request has been accepted');
  try {
    logger.info('scraping request has been accepted');
    await scrapeGenreTopMovies();
    logger.info('scraping ended');
  }
  catch (e) {
    logger.error(e.message);
  }
};

module.exports = { scrapeTomatoByYear, scrapeYoutube, scrapeTopGenres };
