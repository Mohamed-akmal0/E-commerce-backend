const bcrypt = require("bcrypt");
const { hashPassword } = require("../helpers/helperFunctions");
const userSchema = require("../models/userModel");

module.exports.signupController = async (req, res) => {
  //credentials null validation can be done in the client side
  try {
    const { email, name, password } = req?.body;
    const alreadyCreated = await userSchema.findOne({ email: email });
    if (alreadyCreated) {
      throw new Error("email already in use");
    }
    const hashedPassword = await hashPassword(password);
    //creating new user instance
    const newUser = new userSchema({
      email: email,
      name: name,
      password: hashedPassword,
    });
    //saving user to db
    await newUser.save();
    res
      .status(201)
      .json({ message: "user stored successfully"});
  } catch (error) {
    console.log("err in signup controller", error);
    res.status(400).json({
      errMessage: error.message,
    });
  }
};

module.exports.loginController = async (req, res) => {
  //credentials null validation can be done in the client side
  try {
    const { email, password } = req.body;
    const fetchUserDetails = await userSchema.findOne({ email: email });
    if (!fetchUserDetails) {
      throw new Error("incorrect email");
    }
    const comparedPassword = await bcrypt.compare(
      password,
      fetchUserDetails.password
    );
    if (!comparedPassword) {
      throw new Error("incorrect password");
    }
    res.status(200).json({ msg: "success", data: fetchUserDetails });
  } catch (error) {
    console.log("err in login controller", error);
    res.status(400).json({
      message: error.message,
    });
  }
};
