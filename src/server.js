const express = require("express");
const { json } = require("express");
const dotenv = require("dotenv");
const databaseConnection = require("./database/connection");
const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin")

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));

//database connection
databaseConnection();

//routes
app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
