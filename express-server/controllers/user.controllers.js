const User = require("../models/user.model");
const HttpStatus = require("http-status-codes");

const login = async (req, res) => {
  console.log("login route");
  res.json({ message: "Login route" });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  res.json({ email, password });
};

module.exports = { login, signup };
