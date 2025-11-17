// kevyamon/portfolio-backend/routes/authRoutes.js
import express from 'express';
// Importer 'protect'
import { protect } from '../middleware/authMiddleware.js'; 
// Importer la nouvelle fonction
import { loginAdmin, checkAuthStatus } from '../controllers/authController.js'; 

const router = express.Router();

router.post('/login', loginAdmin);

// --- NOUVELLE ROUTE ---
// On place le "garde du corps" 'protect' devant la route de statut.
// Si le "pass" (cookie) n'est pas bon, 'protect' bloquera la requête.
router.get('/status', protect, checkAuthStatus);

export default router;