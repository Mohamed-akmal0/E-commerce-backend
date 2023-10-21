const { hashPassword } = require("../helpers/helperFunctions");
const userSchema = require("../models/userModel");

module.exports.signupController = async (req, res) => {
  try {
    const { email, name, password } = req?.body;
    const alreadyCreated = await userSchema.findOne({email:email})
    if(alreadyCreated){
      throw new Error('email already in use')
    }
    const hashedPassword = hashPassword(password);
    //creating new user instance
    const newUser = new userSchema({
      email: email,
      name: name,
      password: hashedPassword,
    });
    //saving user to db
    await newUser.save();
    res.status(200).json({ message: "user stored successfully" });
  } catch (error) {
    console.log("err in signup controller", error);
    res.status(400).json({
      errMessage: error.message,
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
