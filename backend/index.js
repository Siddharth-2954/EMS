const express = require("express");
const app = express();
const user = require("./routes/users");
const cors = require("cors");
const morgan = require("morgan");
const transaction = require("./routes/transactionRoutes");
const path = require('path');

require("dotenv").config();

app.use(express.json());

// CORS configuration for production
const corsOptions = {
  origin: 'https://ems-5-vq6p.onrender.com', // Allow the frontend from the production URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));

// Set the frontend build directory
app.use(express.static(path.join(__dirname, 'client/build'))); // Adjust path as per your frontend location

// API Routes
app.use("/api/v1", user);
app.use("/api/t1", transaction);

// Serve frontend in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html')); // Serve the React index.html for any other routes
});

const PORT = process.env.PORT || 4000;

// Connect to the database
require("./config/database").connect();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
