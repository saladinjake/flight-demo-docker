const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Load models
const Flight = require('./models/Flight');
const User = require('./models/User');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Sample Data
const flights = [
  {
    flightNumber: 'FG101',
    airline: 'Flyingo Air',
    departure: { airport: 'LHR', city: 'London', time: new Date('2021-02-10T10:00:00') },
    arrival: { airport: 'JFK', city: 'New York', time: new Date('2021-02-10T14:00:00') },
    price: 450,
    seatsAvailable: 100,
  },
  {
    flightNumber: 'FG202',
    airline: 'Flyingo Air',
    departure: { airport: 'CDG', city: 'Paris', time: new Date('2021-02-12T09:00:00') },
    arrival: { airport: 'DXB', city: 'Dubai', time: new Date('2021-02-12T18:00:00') },
    price: 600,
    seatsAvailable: 80,
  },
];

// Import data
const importData = async () => {
  try {
    await Flight.create(flights);
    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Flight.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
