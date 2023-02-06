const mongoose = require('mongoose');
const dbConnect = async () => {
  try {
    const connect = await mongoose.mongoose.connect(
      'mongodb+srv://oluwatomisin:oluwatomisin@cluster0.auwdhff.mongodb.net/node_auth?retryWrites=true&w=majority'
    );
    console.log(`mongoDb connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;
