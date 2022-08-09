const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/database');
const app = express();
const port = 8000 || process.env.PORT;

dbConnect();
app.listen(port, () => {
  console.log(`app is been listen to on ${port}`);
});
