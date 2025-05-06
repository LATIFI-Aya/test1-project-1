import express from "express";
import cors from "cors";
import mongoose from "mongoose";    
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";
import adminRouter from './routes/admin.js';

const app = express();

// Middleware - Correct Order is Crucial
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.static("public"));

// Mount Admin Routes FIRST
app.use('/admin', adminRouter);  // THIS MUST COME BEFORE OTHER ROUTES

// Other Routes
app.use("/auth", authRoutes);
app.use("/listing", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// Database connection
const PORT = 4000;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");

        // Admin user creation
        if (process.env.NODE_ENV === 'development') {
            const User = mongoose.model("User");
            if (!await User.findOne({ email: "aya@gmail.com" })) {
                const { genSalt, hash } = await import('bcrypt');
                await User.create({
                    firstName: "Admin",
                    lastName: "User",
                    email: "aya@gmail.com",
                    password: await hash("aya", await genSalt(10)),
                    role: "admin"
                });
                console.log("Admin user created");
            }
        }
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
};

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Admin endpoint: http://localhost:${PORT}/admin/auth/login`);
    });
});

{/*import express from "express";
import cors from "cors";
import mongoose from "mongoose";    
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";
import adminRouter from './routes/admin.js';

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/listing", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRouter);

// Database connection
const PORT = 4000;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");

        // Admin user creation
        if (process.env.NODE_ENV === 'development') {
            const User = mongoose.model("User");
            if (!await User.findOne({ email: "aya@gmail.com" })) {
                const { genSalt, hash } = await import('bcrypt');
                await User.create({
                    firstName: "Admin",
                    lastName: "User",
                    email: "aya@gmail.com",
                    password: await hash("aya", await genSalt(10)),
                    role: "admin"
                });
                console.log("Admin user created");
            }
        }
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
};

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Admin endpoint: http://localhost:${PORT}/admin/auth/login`);
    });
}); */}

{/*import express from "express";
import cors from "cors";
import mongoose from "mongoose";    
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";
import adminRouter from './routes/admin.js';
import seedRouter from './routes/seed.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/auth", authRoutes);
app.use("/listing", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRouter);

// Seed routes (development only)
if (process.env.NODE_ENV === 'development') {
    app.use("/seed", seedRouter);
    console.log("Seed routes enabled in development mode");
}

// Database connection
const PORT = 4000;
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected");

        // Create admin user if not exists (development only)
        if (process.env.NODE_ENV === 'development') {
            const User = mongoose.model("User");
            const existingAdmin = await User.findOne({ email: "aya@gmail.com" });
            
            if (!existingAdmin) {
                const bcrypt = await import('bcrypt');
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash("aya", salt);
                
                await User.create({
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
                console.log("Default admin user created");
            }
        }
    } catch (err) {
        console.error("Database connection error:", err);
        process.exit(1); // Exit if DB connection fails
    }
};

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
        console.log(`Admin login: http://localhost:${PORT}/admin/auth/login`);
    });
}).catch(err => {
    console.error("Failed to initialize server:", err);
});
*/}