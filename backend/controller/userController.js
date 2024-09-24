// controller.js
const signupModels = require('../models/signupModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for user registration
const registerUser = async (req, res) => {
  const { signname, signusername, signuseremail, signuserPassword, purpose } = req.body;

  if (!signname || !signusername || !signuseremail || !signuserPassword || !purpose) {
    return res.status(400).json({ error: 'Name, username, email, and password are required' });
  }

  try {
    const hashedPass = await bcrypt.hash(signuserPassword, 10);
    const newUser = {
      name: signname,
      userName: signusername,
      userEmail: signuseremail,
      userPassword: hashedPass,
      role: purpose
    };

    const savedUser = await signupModels.create(newUser);
    res.json(savedUser);
  } catch (err) {
    if (err.code === 11000) {
      res.json('Email already exists');
    } else {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Middleware for verifying the user
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("Token not available");
    return res.json("Authentication fails");
  } else {
    jwt.verify(token, 'secret123', (err, decode) => {
      if (err) {
        return res.json("User not authenticated");
      } else {
        req.email = decode.email;
        next();
      }
    });
  }
};

// Controller for fetching authenticated user data
const authenticateUser = async (req, res) => {
  try {
    const userData = await signupModels.findOne({ userEmail: req.email });
    if (userData) {
      return res.json(userData);
    } else {
      return res.json("No valid user");
    }
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  const { loginemail, loginpassword } = req.body;

  if (!loginemail || !loginpassword) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await signupModels.findOne({ userEmail: loginemail });

    if (!user) {
      return res.json('Invalid Email');
    }

    const isMatch = await bcrypt.compare(loginpassword, user.userPassword);

    if (!isMatch) {
      return res.json( 'Invalid password' );
    }
    
    const token = jwt.sign({ email: user.userEmail }, "secret123", { expiresIn: '5d' });
    res.cookie("token", token);
    res.json(user);
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  verifyUser,
  authenticateUser,
  loginUser
};
