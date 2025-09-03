const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// रजिस्ट्रेशन (Create Account)
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Account created successfully!' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Error creating account. Email or Username may already exist.' });
    }
});

// routes/authRoutes.js

// ... (रजिस्ट्रेशन वाला कोड पहले जैसा ही रहेगा) ...

// लॉगिन (Updated)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password.' });
        }
        
        // --- यहाँ बदलाव किया गया है ---
        // अब हम यूज़र की जानकारी भी भेज रहे हैं
        res.status(200).json({ 
            message: 'Login successful!',
            user: {
                username: user.username,
                email: user.email
            }
        });
        // --------------------------------

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// ... (Forgot Password वाला कोड पहले जैसा ही रहेगा) ...

module.exports = router;

// --- नया कोड यहाँ जोड़ा गया है ---
// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // अगर यूज़र नहीं मिलता है, तब भी हम सफलता का मैसेज भेजेंगे
            // यह एक सुरक्षा उपाय है ताकि कोई यह पता न लगा सके कि कौन से ईमेल रजिस्टर्ड हैं
            return res.status(200).json({ message: 'If this email is registered, a reset link has been sent.' });
        }

        // यहाँ असली दुनिया में, हम एक टोकन बनाते और ईमेल भेजते
        // अभी के लिए, हम सिर्फ सफलता का मैसेज भेजेंगे
        console.log(`Password reset requested for: ${email}`);
        res.status(200).json({ message: 'If this email is registered, a reset link has been sent.' });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;