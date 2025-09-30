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
const PORT = 5000;

// --- यहाँ बदलाव किया गया है ---
// सर्वर को बताएँ कि किसी भी वेबसाइट से आने वाले अनुरोधों को अनुमति दें
app.use(cors());
// ---------------------------------

app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static('uploads'));

// ... (uploads फोल्डर बनाने वाला कोड) ...

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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});