const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Routes
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();

// --- यहाँ पहला बदलाव किया गया है ---
// Render अपना पोर्ट खुद देगा, हम उसे इस्तेमाल करेंगे
const PORT = process.env.PORT || 5000;
// ---------------------------------

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static('uploads'));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Database Connection
const MONGO_URI = 'mongodb+srv://alisaif35216_db_user:alisaif9839@cluster0.kukz4ri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/user', userRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/ai', aiRoutes);

// Start the server
// --- यहाँ दूसरा बदलाव किया गया है ---
app.listen(PORT, () => {
    // अब यह सही पोर्ट दिखाएगा
    console.log(`Server is running on port ${PORT}`);
});