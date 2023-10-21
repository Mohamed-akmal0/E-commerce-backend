const mongoose = require("mongoose");

const theaterModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
    require: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
    require: true,
  },
});

const theaterSchema = new mongoose.model("Theater", theaterModel);
module.exports = theaterSchema;
