import express from "express";
import cors from "cors";
import mongoose from "mongoose";    
import "dotenv/config";
import authRoutes from "./routes/auth.js";
import listingRoutes from "./routes/listing.js";
import bookingRoutes from "./routes/booking.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//Multer
app.use("/auth", authRoutes)
app.use("/listing", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);


// MongoDB connection
const PORT = 4000;
const connectDB = async () => {
    await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Database connected"));   
};
connectDB();

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server started on http://localhost:${PORT}`)
    } else {
        console.log("Error: " + err);
    }
});