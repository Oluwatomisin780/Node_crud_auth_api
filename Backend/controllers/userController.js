const bcrypt = require('bcryptjs');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

const user = require('../models/user');
const { use } = require('../routes/todoRoutes');
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
  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: 'tomisinoyediran@gmail.com',
      pass: 'cyjlexvxdnisxnkx',
    },
  });

  const mailOptions = {
    from: 'tomisinoyediran@gmail.com',
    to: user.email,
    subject: 'Registeration',
    text: 'Registeration completed',
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
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
  const comparePassword = bcrypt.compare(password, user.password);
  if (!user && !comparePassword) {
    throw new Error('invalid data');
  }
  res.status(200).json({
    token: jwtGeneration(user._id),
    user: user.id,
    email: user.email,
  });
});
