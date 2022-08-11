const express = require('express');

const todoController = require('../controllers/todoController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
router
  .route('/')
  .get(protect, todoController.getTask)
  .post(protect, todoController.createTask);
router
  .route('/:id')
  .put(protect, todoController.updateTask)
  .delete(protect, todoController.deleteTask);
module.exports = router;
