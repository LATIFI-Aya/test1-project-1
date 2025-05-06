import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/User.js";

const router = express.Router();

//Setting up multer for file uploads
const storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, "public/uploads/"); //Storage the uploaded files in the folder (public/uploads directory)
    },
    filename:function (req, file, cb){
        cb(null, file.originalname); //using the original file name 
    },
})
const upload = multer({storage})

// User Register
router.post("/register", upload.single("profileImage"), async (req, res) => {
    try {
        //Get all information from the form
        const { firstName, lastName, email, password } = req.body;
        //the uploaded file is available as req.file
        const profileImage = req.file;

        if(!profileImage){
            return res.status(400).send("No file uploaded");
        }
        //path of uploaded profile image
        const profileImagePath = profileImage.path

        //Checking if the user exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({ message: "User already exists!" });
        }
        //Hashing the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath, //path of the uploaded image
            role: email === "aya@gmail.com" ? "admin" : "user" //sets admin role for specific email
        });
        //Saving the new user 
        await newUser.save();
        //if successful return the user data
        res.status(200).json({
            message: "User registered successfully",
            user:newUser
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: "User registered failed", error: err.message });
    }
});

//User login
router.post("/login", async (req, res) => {
    try{ 
        const { email, password } = req.body;

        //Checking if the user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User doesn't exists!" });
        }
        //Checking if the password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        //Creating jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password; //Removing the password from the user data before sending it to the client
        
        res.status(200).json({ token, user});

    } catch(err){
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});


export default router;