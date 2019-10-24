const mongoose = require('mongoose');
const config = require('../config/config');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  genre_rank: {
    type: Number,
  },
  year_rank: {
    type: Number,
  },
  rating: {
    type: String,
    required: true
  },
  synopsis: {
    type: String
  },
  genres: {
    type: [String],
    required: true
  },
  directors: {
    type: [String]
  },
  writers: {
    type: [String]
  },
  release: {
    type: String
  }, year: {
    type: Number,
    required: true
  },
  boxOffice: {
    type: String
  },
  runtime: {
    type: String
  }, uri : {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  trailer: {
    type: String
  },
  year: {
    type: String
  },
  rated: {
    type: String
  }
}, {strict: false});

const Movie = mongoose.model(config.tomatoModelName, MovieSchema);

module.exports = Movie;