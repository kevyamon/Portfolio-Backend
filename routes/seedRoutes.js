// kevyamon/portfolio-backend/routes/seedRoutes.js
import express from 'express';
import { seedDatabase } from '../controllers/seedController.js';

const router = express.Router();

// La route qui déclenche le script quand on l'appelle
router.get('/run', seedDatabase);

export default router;