const Flight = require('../models/Flight');

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single flight
// @route   GET /api/flights/:id
// @access  Public
exports.getFlight = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ success: false, error: 'Flight not found' });
    }
    res.status(200).json({ success: true, data: flight });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
