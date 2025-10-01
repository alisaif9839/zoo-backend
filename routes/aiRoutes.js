const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/ask', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "No question provided." });
        }

        const API_KEY = 'AIzaSyDbP1Esy5taT9dLebE5dF-9c9MNnrE8nfw'; // आपकी API Key

        // --- यहाँ बदलाव किया गया है ---
        // AI मॉडल का नाम बदलकर 'gemini-pro' कर दिया गया है
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
        // ---------------------------------
        
        // सिस्टम निर्देश को payload से हटा दिया गया है क्योंकि 'gemini-pro' इसे इस तरह सपोर्ट नहीं करता
        const payload = {
            contents: [{
                parts: [{ text: `You are a friendly zoo expert named Zooey. Answer this question about animals simply and for all ages in under 50 words: ${question}` }]
            }]
        };

        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API responded with status: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
            const aiResponse = result.candidates[0].content.parts[0].text;
            res.status(200).json({ answer: aiResponse });
        } else {
            // कभी-कभी AI सुरक्षा कारणों से खाली जवाब भेजता है
            res.status(200).json({ answer: "I can't answer that question right now. Try asking something else about animals!" });
        }

    } catch (error) {
        console.error("AI CHATBOT ERROR:", error);
        res.status(500).json({ message: "Sorry, I'm having trouble thinking right now." });
    }
});

module.exports = router;