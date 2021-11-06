const User = require("../../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS, //نزيد عليه الاكسباير
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    //create new user
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);

    // const payload = {
    //   _id: newUser._id,
    //   username: newUser.username,
    //   exp: Date.now() + JWT_EXPIRATION_MS, //نزيد عليه الاكسباير
    // };
    // const token = jwt.sign(payload, JWT_SECRET);
    res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = generateToken(req.user); //passport passed to the user through req.user
  res.json({ token });
};
