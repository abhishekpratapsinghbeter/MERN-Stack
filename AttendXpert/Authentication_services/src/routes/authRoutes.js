const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios'); 
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Auth = require('../models/auth');

// Route for login
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;
    try {
        // Check if the user exists in student collection
        let user = await Student.findOne({ student_cllgid: userId }).maxTimeMS(30000); // Set custom timeout (in milliseconds)

        // Check if user exists in teacher collection if not found in student collection
        if (!user) {
            user = await Teacher.findOne({ teacher_id: userId });
        }
        if (user) {
            // Check if user exists in auth collection
            let existingAuthUser = await Auth.findOne({ user_ID: userId });
            if (existingAuthUser) {
                // Verify the password
                const isMatch = await bcrypt.compare(password, existingAuthUser.user_password);
                if (!isMatch) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
            } else {
                // User exists but has no authentication entry, create a new one
                const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
                existingAuthUser = await Auth.create({
                    user_ID: userId,
                    user_password: hashedPassword,
                    role: user.role,
                    userdetails:user._id,
                });
            }
            
            // Generate JWT token
            const tokenPayload = {
                userID: userId,
                role: existingAuthUser.role
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
            existingAuthUser.tokens = existingAuthUser.tokens.concat({ token: token });
            await existingAuthUser.save();
            // Notify the logging service about the login event
            await axios.post('https://logging-services.onrender.com/log', { level: 'info', message: `User ${userId} logged in` });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
            res.json({ token }); 
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Route for logout
router.post('/logout/:id', async (req, res) => {
    try {
        // Clear the authentication token from the client's cookies
        res.clearCookie('token');
        const userId = req.params.id;
        // Notify the logging service about the logout event
        await axios.post('https://logging-services.onrender.com/log', { level: 'info', message: `User ${userId} logged out`});
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
