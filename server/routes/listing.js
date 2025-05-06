import express from "express";
import multer from "multer";
import Listing from '../models/Listing.js';


const router = express.Router();
// Configuring multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // using the original filename
  },
});

const upload = multer({storage});

// Create listing route
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        // Take the information from the form
        const { creator, category, type, streetAddress, aptSuite, city, province, country, guestCount, bedroomCount, bedCount, bathroomCount, amenities, title, description, price, } = req.body;
        const listingPhotos = req.files;
        if(!listingPhotos){ //  || listingPhotos.length === 0
            return res.status(400).send("No file uploaded");
        }
        const listingPhotoPaths = listingPhotos.map((file) => file.path);

        const newListing = new Listing({
            creator, category, type, streetAddress, aptSuite, city, province, country, guestCount, bedroomCount, bedCount, bathroomCount, amenities, listingPhotoPaths, title, description, price, 
        });

        await newListing.save();
        res.status(200).json(newListing);
    } catch (err) {
        res.status(409).json({ message: "Fail to create Listing", error: err.message})
        console.log(err);
    };
});

// Get listing by category
router.get("/", async (req, res) => {
    const qCategory = req.query.category;
    try {
        let listings;
        if(qCategory){
            listings = await Listing.find({category: qCategory}).populate("creator"); // filter listings by category
        } else {
            listings = await Listing.find().populate("creator");
        }
        res.status(200).json(listings);
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch Listings", error: err.message});
        console.log(err);
    }
});

// Listing Details 
router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params;
        const listing = await Listing.findById(listingId).populate("creator"); // find listing by id and populate creator
        res.status(202).json(listing);
    } catch (err) {
        res.status(404).json({ message: "Listing cannot found", error: err.message});
    }
});


// Get listing by Search
router.get("/search/:search", async (req, res) => {
    const {search} = req.params;
    try {
        let listings = [];
        if(search == "All"){
            listings = await Listing.find().populate("creator"); // filter listings by category
        } else {
            listings = await Listing.find({ 
                $or:[ 
                    {category: {$regex: search, $options: "i" }},
                    {title: {$regex: search, $options: "i" }},
                ]}).populate("creator");
        }
        res.status(200).json(listings);
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch Listings", error: err.message});
        console.log(err);
    }
});

export default router;