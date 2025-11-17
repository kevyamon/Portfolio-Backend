// kevyamon/portfolio-backend/routes/messageRoutes.js
import express from 'express';
import {
  createMessage,
  getMessages, // NOUVEAU (Admin)
  markMessageAsRead, // NOUVEAU (Admin)
  deleteMessage, // NOUVEAU (Admin)
} from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js'; // Le "garde du corps"

const router = express.Router();

// --- Route Publique (Formulaire de contact) ---
router.post('/', createMessage);

// --- Routes Privées (Admin Dashboard) ---

// LIRE tous les messages
router.get('/', protect, getMessages);

// MODIFIER (Marquer comme lu)
router.put('/:id/read', protect, markMessageAsRead);

// SUPPRIMER un message
router.delete('/:id', protect, deleteMessage);

export default router;