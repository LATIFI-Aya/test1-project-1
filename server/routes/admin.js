import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';

const router = express.Router();

// ADMIN LOGIN ROUTE - NO MIDDLEWARE NEEDED HERE
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find admin user
        const user = await User.findOne({ email, role: 'admin' });
        if (!user) {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }

        // 2. Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }

        // 3. Generate JWT token
        const token = jwt.sign(
            { 
                id: user._id, 
                role: user.role,
                email: user.email
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '48h' }
        );

        // 4. Return response
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({ 
            message: "Admin login successful",
            token,
            user: userWithoutPassword
        });

    } catch (err) {
        console.error("Admin login error:", err);
        res.status(500).json({ 
            message: "Server error during admin login",
            error: err.message 
        });
    }
});

// Middleware to verify admin JWT token
const verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Admin access required" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(401).json({ 
            message: "Invalid or expired token",
            error: err.message 
        });
    }
};

// Apply the middleware to all routes that require admin access
router.use(verifyAdminToken);

// Protected Admin Routes
router.get('/properties/pending', async (req, res) => {
    try {
        const listings = await Listing.find({ status: 'pending' }).populate('creator');
        res.status(200).json(listings);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/properties/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const listing = await Listing.findByIdAndUpdate(
            req.params.id, 
            { status },
            { new: true }
        );
        res.status(200).json(listing);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('customerId hostId listingId')
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;  // Only one export default here
