const bcrypt = require('bcryptjs');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
//@register user
exports.registerUser = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const hashedPassowrd = await bcrypt.hash(password, 12);
  const user = new User({
    name: name,
    password: hashedPassowrd,
    email: email,
  });
  const userDetail = await user.save();
  res.status(200).json(userDetail);
});
//@jwt generation
const jwtGeneration = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: '1hr' });
};
// @user Login and auth
exports.loginUser = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  const comparepassword = bcrypt.compare(password, user.password);
  if (comparepassword !== user.password) {
    throw new Error('please input correct  password');
  }
  res.status(200).json({
    token: jwtGeneration,
    user: user.id,
    email: user.email,
  });
});
