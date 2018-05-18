const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "secret = safe";

const createUser = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  return user.save((err, user) => {
    if (err) return res.send(err);
    const token = getTokenForUser({ username: user.username });
    res.json({ token });
  });
};

const getTokenForUser = user => {
  return jwt.sign(user, secret, { expiresIn: "1h" });
};

module.exports = {
  createUser
};
