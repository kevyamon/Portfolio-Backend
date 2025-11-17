// kevyamon/portfolio-backend/controllers/timelineController.js
import Timeline from '../models/TimelineModel.js';

// @desc    Récupérer tous les items du parcours
// @route   GET /api/timeline
// @access  Public
const getTimelineItems = async (req, res) => {
  try {
    // CORRECTION : Trier par le nouvel 'order', du plus petit au plus grand
    const items = await Timeline.find({}).sort({ order: 'asc' });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Créer un nouvel item de parcours
// @route   POST /api/timeline
// @access  Privé (Admin)
const createTimelineItem = async (req, res) => {
  try {
    const { year, title, location, description, icon } = req.body;

    // CORRECTION : Trouver le plus grand 'order' actuel et ajouter 1
    const lastItem = await Timeline.findOne().sort({ order: -1 });
    const newOrder = lastItem ? lastItem.order + 1 : 0;

    const newItem = new Timeline({
      year,
      title,
      location,
      description,
      icon,
      order: newOrder, // Assigner le nouvel ordre
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
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
      item.year = req.body.year || item.year;
      item.title = req.body.title || item.title;
      item.location = req.body.location || item.location;
      item.description = req.body.description || item.description;
      item.icon = req.body.icon || item.icon;
      // L'ordre n'est pas modifié ici, mais via la route dédiée

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

// --- NOUVELLE FONCTION (La "Surprise") ---
// @desc    Réorganiser l'ordre du parcours
// @route   PUT /api/timeline/reorder
// @access  Privé (Admin)
const updateTimelineOrder = async (req, res) => {
  try {
    // Le frontend enverra une liste d'IDs dans le nouvel ordre
    // ex: { orderedIds: ['id_A', 'id_C', 'id_B'] }
    const { orderedIds } = req.body;

    if (!orderedIds || !Array.isArray(orderedIds)) {
      return res.status(400).json({ message: "Liste d'IDs invalide" });
    }

    // C'est une opération "bulk" (en masse)
    const promises = orderedIds.map((id, index) => {
      return Timeline.findByIdAndUpdate(id, { $set: { order: index } });
    });

    // On attend que toutes les mises à jour soient terminées
    await Promise.all(promises);

    res.status(200).json({ message: 'Ordre mis à jour avec succès' });
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
  updateTimelineOrder, // NOUVEL EXPORT
};