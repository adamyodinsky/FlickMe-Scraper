const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const sleep = require('thread-sleep');
const config = require('../config/config');
const Movie = require('mongoose').model(config.tomatoModelName);
const logger = require('../helpers/logger');

const interval = 3000;

const youtubeScraper = async () => {
    const suffix = ' official trailer';

    // start puppeteer
    const browser = await puppeteer.launch({ headless: true});
    const page = await browser.newPage();

    // loop over movies collection
    for await (const movie of Movie.find({trailer: {$exists: false}},{},{timeout: true}).sort({year: 1})) {

        // search for the movie trailer in youtube using puppeteer
        let url = `https://www.youtube.com/results?search_query=${movie.fullName}${suffix}&sp=EgIYAQ%253D%253D`;
        
        await page.goto(url);

        // load html to cheerio
        let html = await page.content();
        let $ = await cheerio.load(html);

        // parse link of first movie
        let link = await $(
            'a.yt-simple-endpoint.style-scope.ytd-video-renderer#video-title').
            attr('href');

            
            let filter = {fullName: movie.fullName};
            let update = { trailer: link };
            let result = await Movie.updateOne(filter, update, {new : true, strict: false});
            
            logger.info({Movie: movie.fullName, Modified: (result.nModified===1? 'yes': 'no'), trailer: link});
            sleep(Math.round(Math.random() * interval + interval));
        }

    await page.close();
    await browser.close();
};

module.exports = { youtubeScraper };