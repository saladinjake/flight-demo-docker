const express = require('express');
const { getFlights, getFlight } = require('../controllers/flightController');

const router = express.Router();

router.route('/').get(getFlights);
router.route('/:id').get(getFlight);

module.exports = router;
