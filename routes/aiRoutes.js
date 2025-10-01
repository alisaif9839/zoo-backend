const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const API_KEY = 'AIzaSyDbP1Esy5taT9dLebE5dF-9c9MNnrE8nfw'; // आपकी API Key

// --- नया डीबगिंग रूट यहाँ जोड़ा गया है ---
// यह हमें बताएगा कि कौन से मॉडल उपलब्ध हैं
router.get('/list-models', async (req, res) => {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        
        // यह लिस्ट आपके Render के Logs में दिखाई देगी
        console.log("--- AVAILABLE AI MODELS ---");
        console.log(data.models.map(m => `Name: ${m.name}, Supported Method: ${m.supportedGenerationMethods}`));
        console.log("---------------------------");

        res.status(200).json(data.models);
    } catch (error) {
        console.error("LIST MODELS ERROR:", error);
        res.status(500).json({ message: "Could not list models." });
    }
});
// ---------------------------------------------


router.post('/ask', async (req, res) => {
    // (आपका पुराना /ask वाला कोड अभी के लिए यहाँ रहेगा, हम उसे बाद में ठीक करेंगे)
    try {
        const { question } = req.body;
        // ... (बाकी का कोड)
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
        // ... (बाकी का कोड)
    } catch (error) {
        // ...
    }
});

module.exports = router;