const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  num: {
    type: Number
  },
  plot: {
    type: String
  },
  genres: {
    type: Array
  },
  runtime: {
    type: Object
  },
  cast: {
    type: Array
  },
  title: {
    type: String
  },
  fullplot: {
    type: String
  },
  languages: {
    type: Array
  },
  released: {
    type: Object
  },
  directors: {
    type: Array
  },
  writers: {
    type: Array
  },
  awards: {
    type: Object
  },
  lastupdated: {
    type: String
  },
  year: {
    type: Object
  },
  imdb: {
    type: Object
  },
  countries: {
    type: Array
  },
  type: {
    type: String
  },
  tomatoes: {
    type: Object
  },
  num_mflix_comments: {
    type: Object
  }
});

module.exports = mongoose.model("dataSchema", dataSchema);
