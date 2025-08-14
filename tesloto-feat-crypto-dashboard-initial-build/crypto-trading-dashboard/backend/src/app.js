const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
// I will configure CORS more securely later. For now, it allows all origins.
app.use(cors());
app.use(express.json());

// API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// A simple default route for testing
app.get('/', (req, res) => {
    res.send('Crypto Trading Dashboard Backend is up!');
});

module.exports = app;
