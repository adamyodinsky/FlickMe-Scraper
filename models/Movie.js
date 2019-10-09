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
  rank: {
    type: String,
    required: true
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
    type: String,
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
  }
});

const Movie = mongoose.model(config.tomatoModelName, MovieSchema);

module.exports = Movie;