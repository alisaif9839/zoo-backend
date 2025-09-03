// routes/userRoutes.js (New File)
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// प्रोफाइल अपडेट करने के लिए
router.post('/update-profile', async (req, res) => {
    try {
        const { email, fullName, city, favoriteAnimal, bio, profilePicture } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { email: email }, // इस ईमेल वाले यूज़र को ढूंढो
            { // और यह जानकारी अपडेट कर दो
                fullName,
                city,
                favoriteAnimal,
                bio,
                profilePicture
            },
            { new: true } // ताकि हमें अपडेटेड यूज़र वापस मिले
        ).select('-password'); // पासवर्ड वापस न भेजें

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Profile updated successfully!", user: updatedUser });

    } catch (error) {
        console.error("Profile Update Error:", error);
        res.status(500).json({ message: "Server error while updating profile." });
    }
});

module.exports = router;