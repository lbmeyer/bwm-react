const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

const UserController = require('../controllers/user');

router.get('/secret', UserController.authMiddleware, (req, res) => {
  res.json({'secret': true});
})

// @route   GET api/v1/rentals
// @desc    Get users route
// @access  Public
router.get('', (req, res) => {
  Rental.find({})
    .select('-bookings') // exclude bookings field
    .exec(function(err, foundRentals) {
      res.json(foundRentals);
    })
});

// @route   GET api/v1/rentals/:id
// @desc    Get rental by id route
// @access  Public
router.get('/:id', (req, res) => {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate('user', 'username -_id') // populate username but not _id from user 
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err, foundRental) {
      if (err) {
        res.status(422).send({
          errors: [
            {
              title: 'Rental Error!',
              details: 'Could not find Rental!'
            }
          ]
        });
      }
      res.json(foundRental);
    });
});

module.exports = router;
