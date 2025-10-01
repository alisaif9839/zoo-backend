const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/ask', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "No question provided." });
        }

        // --- यहाँ बदलाव किया गया है ---
        // आपकी API Key यहाँ जोड़ दी गई है
        const API_KEY = 'AIzaSyDbP1Esy5taT9dLebE5dF-9c9MNnrE8nfw';
        // ---------------------------------
        
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-1.5-pro-latest:generateContent?key=${API_KEY}`;
        
        const systemInstruction = "You are a friendly and knowledgeable zoo expert named 'Zooey'. Answer questions about animals in a simple, fun, and informative way for all ages. Keep answers under 50 words.";

        const payload = {
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents: [{ parts: [{ text: question }] }]
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
        // जाँचें कि क्या जवाब मौजूद है
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
            const aiResponse = result.candidates[0].content.parts[0].text;
            res.status(200).json({ answer: aiResponse });
        } else {
            throw new Error("Invalid response structure from Gemini API.");
        }

    } catch (error) {
        console.error("AI CHATBOT ERROR:", error);
        res.status(500).json({ message: "Sorry, I'm having trouble thinking right now." });
    }
});

module.exports = router;