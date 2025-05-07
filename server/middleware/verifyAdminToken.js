import express from 'express';
import { verifyAdminToken } from '../middleware/verifyAdminToken.js';

const router = express.Router();

router.use(verifyAdminToken); // Apply the middleware to all admin routes

router.get('/properties/pending', (req, res) => {
  // your code for fetching pending properties
});

export default router;
