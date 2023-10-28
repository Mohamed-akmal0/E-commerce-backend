const bcrypt = require("bcrypt");
const { hashPassword } = require("../helpers/helperFunctions");
const theaterSchema = require("../models/theaterModel");

const theaterSignup = async (req, res) => {
  //credentials null validation can be done in the client side
  try {
    const { name, email, password } = req.body;
    const emailExist = await theaterSchema.findOne({ email: email });
    if (emailExist) {
      throw new Error("email already in use");
    }
    const hashedPassword = hashPassword(password);
    const newTheaterUser = new theaterSchema({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await newTheaterUser.save();
    res.status(201).json({ msg: "you can log in once you get approval" });
  } catch (error) {
    res.status(400).json({ errMessage: error.message });
  }
};

const theaterLogin = async (req, res) => {
  //credentials null validation can be done in the client side
  try {
    const { email, password } = req.body;
    const fetchTheaterDetails = await theaterSchema.findOne({ email: email });
    if (!fetchTheaterDetails) {
      throw new Error("incorrect email");
    }
    if (!fetchTheaterDetails.isApproved) {
      throw new Error("will send an email once get the approval");
    }
    const comparedPassword = await bcrypt.compare(
      password,
      fetchTheaterDetails.password
    );
    if (!comparedPassword) {
      throw new Error("incorrect password");
    }
    res.status(200).json({ data: fetchTheaterDetails });
  } catch (error) {
    res.status(400).json({ errMessage: error.message });
  }
};

module.exports = {
  theaterSignup,
  theaterLogin,
};
