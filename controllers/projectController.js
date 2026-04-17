//kevyamon/portfolio-backend/controllers/projectController.js
import Project from '../models/ProjectModel.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Recuperer tous les projets
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Creer un nouveau projet
// @route   POST /api/projects
// @access  Prive (Admin)
const createProject = async (req, res, next) => {
  try {
    const { title, description, link } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier media fourni' });
    }

    const mediaUrl = req.file.path;
    const mediaPublicId = req.file.filename; 

    // Auto-detection du type de media
    let detectedMediaType = 'image';
    if (req.file.mimetype && req.file.mimetype.startsWith('video/')) {
      detectedMediaType = 'video';
    }

    const newProject = new Project({
      title,
      description,
      mediaType: detectedMediaType,
      link,
      mediaUrl,
      mediaPublicId,
    });

    const savedProject = await newProject.save();
    
    // SOCKET : Signal de mise a jour
    if (req.io) {
        req.io.emit('projects_updated');
    }

    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Modifier un projet
// @route   PUT /api/projects/:id
// @access  Prive (Admin)
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = req.body.title || project.title;
      project.description = req.body.description || project.description;
      
      if (req.body.link !== undefined) {
        project.link = req.body.link;
      }

      if (req.file) {
        await cloudinary.uploader.destroy(project.mediaPublicId, {
          resource_type: project.mediaType,
        });

        project.mediaUrl = req.file.path;
        project.mediaPublicId = req.file.filename;
        
        // Auto-detection du nouveau type de media
        if (req.file.mimetype && req.file.mimetype.startsWith('video/')) {
          project.mediaType = 'video';
        } else {
          project.mediaType = 'image';
        }
      }

      const updatedProject = await project.save();
      
      // SOCKET : Signal de mise a jour
      if (req.io) {
        req.io.emit('projects_updated');
      }

      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ message: 'Projet non trouve' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un projet
// @route   DELETE /api/projects/:id
// @access  Prive (Admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await cloudinary.uploader.destroy(project.mediaPublicId, {
        resource_type: project.mediaType,
      });

      await project.deleteOne();

      // SOCKET : Signal de mise a jour
      if (req.io) {
        req.io.emit('projects_updated');
      }

      res.status(200).json({ message: 'Projet supprime avec succes' });
    } else {
      res.status(404).json({ message: 'Projet non trouve' });
    }
  } catch (error) {
    next(error);
  }
};

export { 
  getProjects,
  createProject,
  updateProject,
  deleteProject
};