// models/userModel.js (Updated)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // --- नई फील्ड्स यहाँ जोड़ी गई हैं ---
    fullName: { type: String, default: '' },
    city: { type: String, default: '' },
    favoriteAnimal: { type: String, default: '' },
    bio: { type: String, default: '' },
    // हम फोटो को टेक्स्ट (Base64) के रूप में सेव करेंगे
    profilePicture: { type: String, default: '' } 
});

module.exports = mongoose.model('User', userSchema);