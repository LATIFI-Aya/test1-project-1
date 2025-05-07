import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyAdminToken = async (req, res, next) => {
    try {
        // Get token from headers
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        
        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if user exists and is an admin
        const user = await User.findById(decoded.id);
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        // Add user info to request for later use
        req.user = {
            id: user._id,
            email: user.email,
            role: user.role
        };
        
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token. Please login again." });
        }
        
        res.status(500).json({ message: "Server error during authentication." });
    }
};