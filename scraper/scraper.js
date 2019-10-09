const request = require('request-promise-native');
const cheerio = require('cheerio');
const sleep = require('thread-sleep');
const logger = require('../helpers/logger');
const config = require('../config/config');
const saveMovie = require('../helpers/saveMovie');

const tomato_base = config.tomatoUri;
const top_uri  = "top/bestofrt";
const interval = 5000;

const superCrawler = async (range) => {
  let length = range.end - range.start;
  let year = range.start;

  for(let i=0; i<=length; i++){
    await scrapeYearTopMovies(`${tomato_base}/${top_uri}/?year=${year}`, year);
    year++;
  }
};

const scrapeYearTopMovies = async (uri, year) => {
  logger.info("Scraping Movies From "+ year);

  const options = {
    uri: uri,
    transform: (body) => {
      return cheerio.load(body);
    }
  };

  // Grab html page
  let $ = await request(options);

  // grab objects of movies
  // let moviesObjects_a = $('table.table').children('tbody').children('tr').find('a');
  let tr_objects = $('table.table').children('tbody').children('tr');
  let tr_element = tr_objects.first();

  let storedCount = 0;
  let scrapedCount = 0;
  // scrape inside a movie page
  logger.info(`Preparing to scrape ${tr_objects.length} movies, From ${year}`);
  sleep(1000);
  for (let i=0; i<tr_objects.length; i++) {
  let movie;
    let link = tr_element.find('a').attr('href');

    // scrape movie details from movie specific page
    logger.info(`Scraping From ${tomato_base}${link}`);
    movie = await scrapeMovie(`${tomato_base}${link}`, year);
    movie.rank = tr_element.children('td.bold').text().trim().replace('.', '');
    movie.rating =  tr_element.find('span.tMeterScore').first().text().trim();
    movie.fullName = tr_element.children('td').children('a').text().trim();
    console.log(movie);
    scrapedCount++;

    // count and store movie in DB
    storedCount += await saveMovie.saveMovie(movie);

    sleep(Math.round(interval + Math.random()*interval));
    tr_element = tr_element.next(); // move to the next tr element
  }

  logger.info({Scraped: scrapedCount, Stored: storedCount,  Year: year });
};


const scrapeMovie = async(uri, year) => {
  let movie = {
    fullName: "",
    name: "",
    rank: "",
    rating: "",
    synopsis: "",
    rate: "",
    genres: [],
    directors: [],
    writers: [],
    release: "",
    boxOffice: "",
    runtime: "",
    year: year,
    uri: uri
  };

  const options = {
    uri: uri,
    transform: (body) => {
      return cheerio.load(body);
    }
  };


  // Grab html page
  let $ = await request(options);
  let details = $('div#movieSynopsis');

  // grab name and synopsis
  movie.name  = $('h1').html().trim();
  movie.synopsis = details.text().trim();

  details = details.next('ul').children('li').first(); // first of info element block

  // skip until the matching
  let j=0;
  try {
    while ((details.children('div.meta-label').html().trim() !== 'Rating:') && j < 10) { j++; }
  } catch (e) {
    logger.error(e.message + `parsing page of movie: ${movie.name} - ${uri}`);
  }

  // grab rate
  if(j<10) {
    let rating = details.children('div.meta-value').first();
    movie.rate = rating.text().trim();
  }

  // skip until the matching
  j=0;
  details = details.next();
  try {
    while ((details.children('div.meta-label').text().trim() !== 'Genre:') && j < 10) { j++; }
  } catch (e) {
    logger.error(e.message);
  }

  // grab genre
  if(j<10) {
    let genres = details.children('div.meta-value').children('a');
    for (let i = 0; i < genres.length; i++) {
      movie.genres.push(genres[i].children[0].data);
    }
  }

  // skip until matching
  j=0;
  details = details.next();
  try {
    while ((details.children('div.meta-label').text().trim() !== 'Directed By:') && j < 10) { j++; }
  } catch (e) {
    logger.error(e.message);
  }

  //grab directors
  if(j<10) {
    let directors = details.children('div.meta-value').children('a');
    for (let i = 0; i < directors.length; i++) {
      movie.directors.push((directors[i].children[0].data));
    }
  }

  // skip until the matching
  j=0;
  details = details.next();
  try {
    while ((details.children('div.meta-label').text().trim() !== 'Written By:') && j < 10) { j++; }
  } catch (e) {
    logger.error(e.message);
  }

  //grab writers
  if(j<10) {
    let writers = details.children('div.meta-value').children('a');
    for (let i = 0; i < writers.length; i++) {
      movie.writers.push((writers[i].children[0].data));
    }
  }

  // skip until the matching
  j=0;
  details = details.next();
  try {
    while ((details.children('div.meta-label').text().trim() !== 'In Theaters:') && j < 10) { j++; }
  } catch (e) {
    logger.error(e.message);
  }

  // grab release date
  if(j<10) {
    let release = details.children('div.meta-value').children('time');
    movie.release = release.text().trim();
  }

  // skip until the matching
  j=0;
  details = details.next().next();
  try {
    while ((details.children('div.meta-label').text().trim() !== 'Box Office:') && j < 10) { j++; }
  } catch (e) {
    logger.error(e.message);
  }

  // grab box office
  if(j<10) {
    let boxOffice = details.children('div.meta-value');
    movie.boxOffice = boxOffice.text().trim();
  }
  // skip until the matching
  j=0;
  details = details.next();
  try {
    while ((details.children('div.meta-label').text().trim() !== 'Runtime:') && j < 10) {
      j++;
    }
  } catch (e) {
    logger.error(e.message);
  }

  // grab run time
  if(j<10) {
    let runtime = details.children('div.meta-value').children('time');
    movie.runtime = runtime.text().trim();
  }

  return movie;
};

// superCrawler({start: 2000, end: 2000}); // for test the scraper

module.exports = { superCrawler };
