const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const BookingController = require('../controllers/booking');

// @route   POST api/v1/bookings
// @desc    Create bookings route
// @access  Public
router.post('', UserController.authMiddleware, BookingController.createBooking);

module.exports = router;
