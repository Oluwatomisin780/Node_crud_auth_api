const express = require('express');
const dotenv = require('dotenv').config();
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoute');
const dbConnect = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const app = express();
const port = 8000 || process.env.PORT;
app.use(bodyParser.json());
dbConnect();
app.use('/api/tasks/', todoRoutes);
app.use('/api/users/', userRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`app is been listen to on ${port}`);
});
