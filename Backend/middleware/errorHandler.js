const errorHandler = (err, req, res, next) => {
  const stausCode = res.stausCode ? res.statusCode : 500;
  res.json({
    message: err.message,
    stack: process.env.NODE_DEVELOPMENT === 'production' ? null : err.stack,
  });
};
module.exports = {
  errorHandler,
};
