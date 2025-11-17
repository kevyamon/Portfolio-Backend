// kevyamon/portfolio-backend/controllers/projectController.js
import Project from '../models/ProjectModel.js';
import { cloudinary } from '../config/cloudinary.js'; // On importe l'outil de config Cloudinary

// @desc    Récupérer tous les projets
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// ==========================================
// --- NOUVELLES FONCTIONS ADMIN ---
// ==========================================

// @desc    Créer un nouveau projet
// @route   POST /api/projects
// @access  Privé (Admin)
const createProject = async (req, res) => {
  try {
    const { title, description, mediaType, link } = req.body;
    
    // 1. Vérifier si un fichier a bien été uploadé
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier (média) fourni' });
    }

    // 2. Récupérer les infos de Cloudinary (grâce à 'upload.single')
    const mediaUrl = req.file.path; // L'URL sécurisée (https://...)
    // 'filename' contient le 'public_id' que Cloudinary a généré
    const mediaPublicId = req.file.filename; 

    const newProject = new Project({
      title,
      description,
      mediaType,
      link,
      mediaUrl,
      mediaPublicId,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création du projet', error: error.message });
  }
};

// @desc    Modifier un projet
// @route   PUT /api/projects/:id
// @access  Privé (Admin)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      // Mettre à jour les champs texte
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.link = req.body.link || project.link;

      // Vérifier si un NOUVEAU fichier a été uploadé
      if (req.file) {
        // 1. Oui, un nouveau fichier existe. Supprimer l'ANCIEN de Cloudinary
        // On utilise mediaType pour dire à Cloudinary s'il doit supprimer une 'image' ou une 'video'
        await cloudinary.uploader.destroy(project.mediaPublicId, {
          resource_type: project.mediaType,
        });

        // 2. Mettre à jour la base de données avec les infos du NOUVEAU fichier
        project.mediaUrl = req.file.path;
        project.mediaPublicId = req.file.filename;
        // Mettre à jour le type si nécessaire (ex: remplacer une image par une vidéo)
        project.mediaType = req.body.mediaType || project.mediaType;
      }

      const updatedProject = await project.save();
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: 'Projet non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour du projet', error: error.message });
  }
};

// @desc    Supprimer un projet
// @route   DELETE /api/projects/:id
// @access  Privé (Admin)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      // 1. Supprimer le fichier de Cloudinary
      await cloudinary.uploader.destroy(project.mediaPublicId, {
        resource_type: project.mediaType,
      });

      // 2. Si la suppression Cloudinary réussit, supprimer de MongoDB
      await project.deleteOne();

      res.status(200).json({ message: 'Projet supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Projet non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Exporter toutes les fonctions
export { 
  getProjects,
  createProject,
  updateProject,
  deleteProject
};