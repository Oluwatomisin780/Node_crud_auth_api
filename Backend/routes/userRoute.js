const express = require('express');
const { route } = require('./todoRoutes');
const router = express.Router();
const userController = require('../controllers/userController');
router.route('/').post(userController.registerUser);
router.route('/login').post(userController.loginUser);

module.exports = router;
