const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  airline: {
    type: String,
    required: true,
  },
  departure: {
    airport: String,
    city: String,
    time: Date,
  },
  arrival: {
    airport: String,
    city: String,
    time: Date,
  },
  price: {
    type: Number,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'delayed', 'cancelled', 'in-flight', 'landed'],
    default: 'scheduled',
  },
});

module.exports = mongoose.model('Flight', FlightSchema);
