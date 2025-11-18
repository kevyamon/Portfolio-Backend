// kevyamon/portfolio-backend/routes/profileRoutes.js
import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getProfile);
// On utilise 'upload.single' pour gérer l'image envoyée sous le nom 'image'
router.put('/', protect, upload.single('image'), updateProfile);

export default router;