// kevyamon/portfolio-backend/routes/authRoutes.js
import express from 'express';
import { loginAdmin } from '../controllers/authController.js';

const router = express.Router();

// Quand une requête POST arrive sur /login, on exécute la logique 'loginAdmin'
router.post('/login', loginAdmin);

export default router;