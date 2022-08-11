const asyncHandler = require('express-async-handler');
const Todo = require('../models/todo');
const User = require('../models/user');
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Todo.find({ user: req.user.id });
  res.json(task);
});

exports.createTask = asyncHandler(async (req, res, next) => {
  const todo = req.body.todo;
  const tasks = new Todo({
    todo: todo,
    user: req.user.id,
  });

  const task = await tasks.save();
  res.status(200).json(task);
});

exports.updateTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Todo.findById(taskId);
  if (!task) {
    throw new Error('task does not exist ');
  }
  if (!req.user) {
    throw new Error('not authenticated');
  }
  if (req.user.id !== goal.user.toString()) {
    throw new Error('user not authorized');
  }
  const updateTask = await Todo.findByIdAndUpdate(taskId, req.body, {
    new: true,
  });
  res.status(200).json(updateTask);
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Todo.findById(taskId);
  if (!task) {
    console.log(error);
  }
  if (!task) {
    res.status(400);
    throw new Error('task does not exist ');
  }
  if (!req.user) {
    res.status(400);
    throw new Error('not authenticated');
  }
  if (req.user.id !== goal.user.toString()) {
    throw new Error('user not authorized');
  }
  await Todo.deleteOne(task);
  res.json({
    message: `task deleted ${taskId}`,
  });
});
