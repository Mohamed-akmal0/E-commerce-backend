const express = require("express");
const { json } = require("express");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
