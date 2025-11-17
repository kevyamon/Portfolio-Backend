// kevyamon/portfolio-backend/routes/messageRoutes.js
import express from 'express';
import {
  createMessage,
  getMessages,
  markMessageAsRead,
  markMessageAsUnread, // NOUVEAU
  deleteMessage,
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Route Publique (Formulaire de contact) ---
router.post('/', createMessage);

// --- Routes Privées (Admin Dashboard) ---
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markMessageAsRead);
router.put('/:id/unread', protect, markMessageAsUnread); // NOUVELLE ROUTE
router.delete('/:id', protect, deleteMessage);

export default router;