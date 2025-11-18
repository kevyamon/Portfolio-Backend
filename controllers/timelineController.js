// kevyamon/portfolio-backend/controllers/timelineController.js
import Timeline from '../models/TimelineModel.js';

const getTimelineItems = async (req, res) => {
  try {
    const items = await Timeline.find({}).sort({ order: 'asc' });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

const createTimelineItem = async (req, res) => {
  try {
    const { year, title, location, description, icon } = req.body;
    const lastItem = await Timeline.findOne().sort({ order: -1 });
    const newOrder = lastItem ? lastItem.order + 1 : 0;

    const newItem = new Timeline({
      year, title, location, description, icon, order: newOrder,
    });

    const savedItem = await newItem.save();
    
    // 🔥 SOCKET : Prévenir tout le monde
    req.io.emit('timeline_updated'); 

    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création', error: error.message });
  }
};

const updateTimelineItem = async (req, res) => {
  try {
    const item = await Timeline.findById(req.params.id);
    if (item) {
      item.year = req.body.year || item.year;
      item.title = req.body.title || item.title;
      item.location = req.body.location || item.location;
      item.description = req.body.description || item.description;
      item.icon = req.body.icon || item.icon;

      const updatedItem = await item.save();

      // 🔥 SOCKET
      req.io.emit('timeline_updated');

      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Erreur mise à jour', error: error.message });
  }
};

const deleteTimelineItem = async (req, res) => {
  try {
    const item = await Timeline.findById(req.params.id);
    if (item) {
      await item.deleteOne();
      
      // 🔥 SOCKET
      req.io.emit('timeline_updated');

      res.status(200).json({ message: 'Supprimé' });
    } else {
      res.status(404).json({ message: 'Item non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

const updateTimelineOrder = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!orderedIds || !Array.isArray(orderedIds)) {
      return res.status(400).json({ message: "IDs invalides" });
    }
    const promises = orderedIds.map((id, index) => {
      return Timeline.findByIdAndUpdate(id, { $set: { order: index } });
    });
    await Promise.all(promises);

    // 🔥 SOCKET
    req.io.emit('timeline_updated');

    res.status(200).json({ message: 'Ordre mis à jour' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

export {
  getTimelineItems,
  createTimelineItem,
  updateTimelineItem,
  deleteTimelineItem,
  updateTimelineOrder,
};