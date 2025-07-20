const express = require('express');
const router = express.Router();
const winston = require('winston');
const Log = require('../../models/logging');

// Configure Winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

// Route for logging
router.post('/log', async (req, res) => {
    const { level, message } = req.body;

    // Log the message using Winston
    logger.log(level, message);

    // Save the log to MongoDB
    try {
        const logEntry = new Log({ level, message });
        await logEntry.save();
        res.status(201).json({ message: 'Log created successfully' });
    } catch (error) {
        console.error('Error saving log to MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route for retrieving logs
router.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(10); // Fetch the latest 10 logs
        res.json(logs);
    } catch (error) {
        console.error('Error fetching logs from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
