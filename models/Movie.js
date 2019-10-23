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
    type: Number,
    required: true
  },
  year_rank: {
    type: Number,
    required: true,
    default: -1
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
  }
}, {strict: false});

const Movie = mongoose.model(config.tomatoModelName, MovieSchema);

module.exports = Movie;