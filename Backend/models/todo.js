const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'user',
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('todo', todoSchema);
