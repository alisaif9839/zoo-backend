const express = require('express');
const router = express.Router();
const TicketBooking = require('../models/ticketModel');

router.post('/book', async (req, res) => {
    try {
        const newBooking = new TicketBooking(req.body);
        await newBooking.save();
        res.status(201).json({ message: 'Ticket booked successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error booking ticket.' });
    }
});

module.exports = router;