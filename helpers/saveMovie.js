const Movie = require('../models/Movie');
const logger  = require('../helpers/logger');
const config  = require('../config/config');


const saveMovie = async ( movie ) => {
  try {
      let movieExist = await Movie.findOne( {fullName: movie.fullName} );
      if (movieExist) {
        logger.debug(`Movie: ${movie.name}, Year: ${movie.release} already exists in Data Base`);
        return 0;
      }

      const newMovie = new Movie( {...movie} );
      await newMovie.save();
      logger.info(`Stored In DB - Movie: ${movie.name}, Year: ${movie.year}`);
      return 1;
  } catch (err) {
      logger.error(err.message);
      return 0;
  }
};

module.exports = { saveMovie };