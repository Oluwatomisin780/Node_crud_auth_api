const mongoose = require('mongoose');
const dbConnect = async () => {
  try {
    const connect = await mongoose.mongoose.connect(process.env.DATABASE_URI);
    console.log(`mongoDb connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;
