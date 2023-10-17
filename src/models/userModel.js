const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const userSchema = new mongoose.model("User", userModel);
module.exports = userSchema
