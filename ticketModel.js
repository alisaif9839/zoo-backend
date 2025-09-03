// models/ticketModel.js (Corrected Code)
const mongoose = require('mongoose');

const ticketBookingSchema = new mongoose.Schema({
    visitDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    tickets: {
        adult: Number,
        child: Number,
        family: Number
    },
    addons: {
        food: Boolean,
        souvenir: Boolean
    },
    donation: { type: Number, default: 0 },
    // totalAmount को String से Number में बदल दिया गया है, क्योंकि कीमत एक नंबर होती है
    totalAmount: { type: Number, required: true },
    bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TicketBooking', ticketBookingSchema);