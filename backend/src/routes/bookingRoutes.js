const express = require('express');
const { createBooking, getBookings } = require('../controllers/bookingController');

const router = express.Router();

router.route('/')
  .get(getBookings)
  .post(createBooking);

module.exports = router;
