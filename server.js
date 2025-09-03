const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs'); // <-- फाइल सिस्टम को मैनेज करने के लिए
const path = require('path'); // <-- पाथ को मैनेज करने के लिए

// Routes
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static('uploads'));

// --- यहाँ बदलाव किया गया है ---
// सर्वर शुरू होने से पहले 'uploads' फोल्डर की जाँच करें और बनाएँ
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log("Uploads directory created!");
}
// ---------------------------------

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});