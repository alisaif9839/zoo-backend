// models/galleryModel.js (Corrected Code)
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    // 'image' या 'video'
    mediaType: { type: String, required: true },
    
    // --- यहाँ बदलाव किया गया है ---
    // 'imageData' को 'mediaUrl' से बदल दिया गया है ताकि यह हमारे बाकी कोड से मेल खाए
    mediaUrl: { type: String, required: true },
    // --------------------------------

    title: { type: String, required: true },
    uploadedBy: { type: String, required: true, default: 'Anonymous' }
});

// मॉडल का नाम GalleryItem है, GalleryImage नहीं
module.exports = mongoose.model('GalleryItem', gallerySchema);