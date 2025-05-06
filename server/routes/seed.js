import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Only enable this in development
const createAdminUser = async (req, res) => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "aya@gmail.com" });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin user already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("aya", salt);

        // Create admin user
        const adminUser = new User({
            firstName: "Admin",
            lastName: "User",
            email: "aya@gmail.com",
            password: hashedPassword,
            profileImagePath: "",
            role: "admin",
            tripList: [],
            wishList: [],
            propertyList: [],
            reservationList: []
        });

        await adminUser.save();

        res.status(201).json({
            message: "Admin user created successfully",
            user: {
                email: adminUser.email,
                role: adminUser.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating admin user", error: err.message });
    }
};

router.post('/create-admin', createAdminUser);

export default router;