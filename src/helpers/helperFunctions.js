const bcrypt = require("bcrypt");

module.exports.hashPassword = (password) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("err in hash password function", error);
    throw error;
  }
};
