// kevyamon/portfolio-backend/controllers/seedController.js
import Timeline from '../models/TimelineModel.js';
import timelineData from '../data/timelineData.js';

export const seedDatabase = async (req, res) => {
  try {
    // 1. Vider la table pour éviter les doublons
    await Timeline.deleteMany();
    
    // 2. Remplir la table avec les données du fichier
    await Timeline.insertMany(timelineData);

    res.status(200).json({ 
      message: "✅ SUCCÈS : Base de données 'Timeline' remplie avec succès via l'URL magique !" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "❌ ERREUR lors du seeding", 
      error: error.message 
    });
  }
};