// kevyamon/portfolio-backend/controllers/timelineController.js
import Timeline from '../models/TimelineModel.js';

// @desc    Récupérer tous les items du parcours
// @route   GET /api/timeline
// @access  Public
const getTimelineItems = async (req, res) => {
  try {
    const items = await Timeline.find({}).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// ==========================================
// --- NOUVELLES FONCTIONS ADMIN ---
// ==========================================

// @desc    Créer un nouvel item de parcours
// @route   POST /api/timeline
// @access  Privé (Admin)
const createTimelineItem = async (req, res) => {
  try {
    // Les données viendront du formulaire de votre dashboard
    const { year, title, location, description, icon } = req.body;

    const newItem = new Timeline({
      year,
      title,
      location,
      description,
      icon,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem); // 201 = Créé
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
};

// @desc    Modifier un item de parcours
// @route   PUT /api/timeline/:id
// @access  Privé (Admin)
const updateTimelineItem = async (req, res) => {
  try {
    const item = await Timeline.findById(req.params.id);

    if (item) {
      // On met à jour chaque champ avec les nouvelles données
      item.year = req.body.year || item.year;
      item.title = req.body.title || item.title;
      item.location = req.body.location || item.location;
      item.description = req.body.description || item.description;
      item.icon = req.body.icon || item.icon;

      const updatedItem = await item.save();
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
};

// @desc    Supprimer un item de parcours
// @route   DELETE /api/timeline/:id
// @access  Privé (Admin)
const deleteTimelineItem = async (req, res) => {
  try {
    const item = await Timeline.findById(req.params.id);

    if (item) {
      await item.deleteOne();
      res.status(200).json({ message: 'Item supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Item non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// Exporter toutes les fonctions
export {
  getTimelineItems,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem,
};