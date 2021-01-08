const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (Simulated for now)
exports.createBooking = async (req, res) => {
  try {
    const { flightId, userId, seatNumber } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ success: false, error: 'Flight not found' });
    }

    if (flight.seatsAvailable <= 0) {
      return res.status(400).json({ success: false, error: 'No seats available' });
    }

    const booking = await Booking.create({
      flight: flightId,
      user: userId,
      seatNumber,
      status: 'confirmed',
    });

    // Update flight availability
    flight.seatsAvailable -= 1;
    await flight.save();

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Simulated)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('flight').populate('user');
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
