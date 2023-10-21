const theaterSchema = require("../models/theaterModel");

require("dotenv").config();

const adminLogin = async (req, res) => {
  try {
    const adEmail = process.env.ADMIN_EMAIL;
    const adPass = process.env.ADMIN_PASSWORD;
    const { email, password } = req.body;
    if (email === adEmail && password === adPass) {
      res.status(200).json("success");
    } else {
      throw new Error("incorrect email or password");
    }
  } catch (error) {
    res.status(400).json({ errMessage: error.message });
  }
};

const getNonApprovedTheaterAccounts = async (req, res) => {
  try {
    const theaterAccounts = await theaterSchema.findOne({ isApproved: false });
    res.status(200).json({ data: theaterAccounts });
  } catch (error) {
    res.status(400).json({ errMessage: error.message });
  }
};

module.exports = {
  adminLogin,
  getNonApprovedTheaterAccounts,
};
