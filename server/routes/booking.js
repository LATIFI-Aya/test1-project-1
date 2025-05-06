import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

//Create Booking 
router.post('/create', async (req, res) => {
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
        const newBooking = new Booking({
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice
        });

        await newBooking.save()
        res.status(200).json( newBooking );
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Fail to create a new Booking", error: err.message });
    }
});

export default router;