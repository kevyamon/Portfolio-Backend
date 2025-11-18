// kevyamon/portfolio-backend/controllers/projectController.js
import Project from '../models/ProjectModel.js';
import { cloudinary } from '../config/cloudinary.js';

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

// @desc    Créer un nouveau projet
// @route   POST /api/projects
// @access  Privé (Admin)
const createProject = async (req, res) => {
  try {
    const { title, description, mediaType, link } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier (média) fourni' });
    }

    const mediaUrl = req.file.path;
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
    
    // 🔥 SOCKET : Signal de mise à jour
    if (req.io) {
        req.io.emit('projects_updated');
    }

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
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      project.link = req.body.link || project.link;

      if (req.file) {
        await cloudinary.uploader.destroy(project.mediaPublicId, {
          resource_type: project.mediaType,
        });

        project.mediaUrl = req.file.path;
        project.mediaPublicId = req.file.filename;
        project.mediaType = req.body.mediaType || project.mediaType;
      }

      const updatedProject = await project.save();
      
      // 🔥 SOCKET : Signal de mise à jour
      if (req.io) {
        req.io.emit('projects_updated');
      }

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
      await cloudinary.uploader.destroy(project.mediaPublicId, {
        resource_type: project.mediaType,
      });

      await project.deleteOne();

      // 🔥 SOCKET : Signal de mise à jour
      if (req.io) {
        req.io.emit('projects_updated');
      }

      res.status(200).json({ message: 'Projet supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Projet non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// --- C'EST ICI QUE L'ERREUR SE SITUAIT SOUVENT ---
// On exporte bien TOUTES les fonctions
export { 
  getProjects,
  createProject,
  updateProject,
  deleteProject
};