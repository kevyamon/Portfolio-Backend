// kevyamon/portfolio-backend/routes/timelineRoutes.js
import express from 'express';
import {
  getTimelineItems,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem,
  updateTimelineOrder, // NOUVEAU
} from '../controllers/timelineController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Routes Publiques (Lecture) ---
router.get('/', getTimelineItems);

// --- Routes Privées (Admin) ---

// NOUVELLE ROUTE : Pour le glisser-déposer
// Doit être AVANT '/:id' pour ne pas être confondue
router.put('/reorder', protect, updateTimelineOrder); 

router.post('/', protect, createTimelineItem);
router.put('/:id', protect, updateTimelineItem);
router.delete('/:id', protect, deleteTimelineItem);

export default router;