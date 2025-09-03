const express = require('express');
const router = express.Router();
const GalleryItem = require('../models/galleryModel');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// --- Multer का सेटअप ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- सभी आइटम पाने के लिए (यह हिस्सा आपके कोड में गायब था) ---
router.get('/items', async (req, res) => {
    try {
        const items = await GalleryItem.find().sort({ _id: -1 });
        res.status(200).json(items);
    } catch (error) {
        console.error("GET ITEMS ERROR:", error);
        res.status(500).json({ message: 'Error fetching items.' });
    }
});

// --- फोटो अपलोड करने के लिए (यह हिस्सा आपके कोड में गायब था) ---
router.post('/upload-photo', upload.single('photoFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }
        const { title, uploadedBy } = req.body;
        const newItem = new GalleryItem({
            mediaType: 'photo',
            mediaUrl: req.file.path.replace(/\\/g, "/"),
            title: title,
            uploadedBy: uploadedBy
        });
        await newItem.save();
        res.status(201).json({ message: 'Photo uploaded successfully!', item: newItem });
    } catch (error) {
        console.error("PHOTO UPLOAD ERROR:", error);
        res.status(500).json({ message: 'Error uploading photo.' });
    }
});

// --- वीडियो लिंक जोड़ने के लिए (यह हिस्सा आपके कोड में गायब था) ---
router.post('/upload-video', async (req, res) => {
    try {
        const { mediaUrl, title, uploadedBy } = req.body;
        const newItem = new GalleryItem({ mediaType: 'video', mediaUrl, title, uploadedBy });
        await newItem.save();
        res.status(201).json({ message: 'Video added successfully!', item: newItem });
    } catch (error) {
        console.error("VIDEO UPLOAD ERROR:", error);
        res.status(500).json({ message: 'Error adding video.' });
    }
});

// --- DELETE रूट (यह आपके कोड में सही था) ---
router.delete('/delete/:id', async (req, res) => {
    try {
        const item = await GalleryItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        if (item.mediaType === 'photo') {
            const filePath = path.join(__dirname, '..', item.mediaUrl);
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) console.error("Could not delete file:", filePath, err);
                });
            }
        }

        await GalleryItem.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: 'Item deleted successfully.' });

    } catch (error) {
        console.error("DELETE ERROR:", error);
        res.status(500).json({ message: 'Error deleting item.' });
    }
});

module.exports = router;