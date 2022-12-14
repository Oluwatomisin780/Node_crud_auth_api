const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      //@token verification
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      //@get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('not authorized');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('not authorize,no token');
  }
});
module.exports = {
  protect,
};
