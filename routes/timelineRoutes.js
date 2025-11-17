// kevyamon/portfolio-backend/routes/timelineRoutes.js
import express from 'express';
import {
  getTimelineItems,
  createTimelineItem, // NOUVEAU
  updateTimelineItem, // NOUVEAU
  deleteTimelineItem, // NOUVEAU
} from '../controllers/timelineController.js';
import { protect } from '../middleware/authMiddleware.js'; // Importer le "garde du corps"

const router = express.Router();

// --- Routes Publiques (Lecture) ---
router.get('/', getTimelineItems);

// --- Routes Privées (Admin) ---
// On utilise .route() pour chaîner les requêtes sur la même URL

// Pour la racine ('/')
router.post('/', protect, createTimelineItem); // Seul l'admin (protégé) peut CRÉER

// Pour une URL avec un ID (ex: /api/timeline/12345)
router.put('/:id', protect, updateTimelineItem); // Seul l'admin (protégé) peut MODIFIER
router.delete('/:id', protect, deleteTimelineItem); // Seul l'admin (protégé) peut SUPPRIMER

export default router;