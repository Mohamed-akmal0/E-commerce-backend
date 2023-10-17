const { hashPassword } = require("../helpers/helperFunctions");
const userSchema = require("../models/userModel")

module.exports.signupController = async (req, res) => {
  try {
    const { email, name, password } = req?.body;
    console.log("email in controller", email);
    const hashedPassword = hashPassword(password)
    res.status(200).json({ data: { email: email, name: name, pass:hashedPassword } });
  } catch (error) {
    console.log("err in signup controller", error);
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports.loginController = (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    console.log("err in login controller", error);
    res.status(400).json({
      message: error.message,
    });
  }
};
