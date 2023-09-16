const mongoose = require("mongoose");
require("dotenv").config();

const databasePort = process.env.DB_URI;

const databaseConnection = async () => {
  try {
    const connect = await mongoose.connect(databasePort, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `database successfully connected on host ${connect.connection.host} and name ${connect.connection.name} `
    );
  } catch (error) {
    console.log("error while connecting database", error);
    process.exit(1);
  }
};

module.exports = databaseConnection;
