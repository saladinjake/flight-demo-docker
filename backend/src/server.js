const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config();

// Connect to database
connectDB();

const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/error');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Mount Routers
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// Error Handler
app.use(errorHandler);

// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Flyingo API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
