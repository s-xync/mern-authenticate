const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const HttpStatus = require("http-status-codes");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("*", (req, res) => {
  res.status(HttpStatus.NOT_FOUND).json({ message: "Route Not Found." });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
