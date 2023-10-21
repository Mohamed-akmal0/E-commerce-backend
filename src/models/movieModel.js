const mongoose = require("mongoose");

const movieModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  duration: {
    type: String,
    require: true,
  },
  category: {
    type:String,
    require: true
  },
  certificate: {
    type:String,
    require: true
  }
});

const movieSchema = new mongoose.model("Movie", movieModel);
module.exports = movieSchema