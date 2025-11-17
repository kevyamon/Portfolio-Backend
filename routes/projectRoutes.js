// kevyamon/portfolio-backend/routes/projectRoutes.js
import express from 'express';
import {
  getProjects,
  createProject, // NOUVEAU
  updateProject, // NOUVEAU
  deleteProject, // NOUVEAU
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js'; // Le "garde du corps"
import { upload } from '../config/cloudinary.js'; // L'outil d'upload

const router = express.Router();

// --- Route Publique (Lecture) ---
router.get('/', getProjects);

// --- Routes Privées (Admin) ---

// CRÉER un projet:
// 1. 'protect' vérifie le "pass" (JWT)
// 2. 'upload.single('media')' attrape le fichier nommé 'media' et l'envoie à Cloudinary
// 3. 'createProject' sauvegarde les infos (dont l'URL Cloudinary) dans MongoDB
router.post('/', protect, upload.single('media'), createProject);

// MODIFIER un projet
// 'upload.single('media')' est aussi ici au cas où vous voudriez CHANGER le média
router.put('/:id', protect, upload.single('media'), updateProject);

// SUPPRIMER un projet
router.delete('/:id', protect, deleteProject);

export default router;