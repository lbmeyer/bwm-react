const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

// @route   POST api/v1/users/auth
// @desc    Login User
// @access  Public
router.post('/auth', User.auth);

// @route   POST api/v1/users/register
// @desc    Register User
// @access  Public
router.post('/register', User.register);

module.exports = router;
