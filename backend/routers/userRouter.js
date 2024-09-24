// userRouter.js
const express = require('express');
const { registerUser, verifyUser, authenticateUser, loginUser } = require('../controller/userController');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user authentication
router.get('/auth', verifyUser, authenticateUser);

// Route for user login
router.post('/login', loginUser);

module.exports = router;
