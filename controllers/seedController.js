// kevyamon/portfolio-backend/controllers/seedController.js
import Timeline from '../models/TimelineModel.js';
import Project from '../models/ProjectModel.js';
import Profile from '../models/ProfileModel.js';
import timelineData from '../data/timelineData.js';
import projectData from '../data/projectData.js';

export const seedDatabase = async (req, res) => {
  try {
    console.log('🏁 Début du seeding de la base de données...');

    // 1. Vider les collections pour repartir sur une base propre sans doublons
    await Timeline.deleteMany();
    await Project.deleteMany();
    await Profile.deleteMany();
    console.log('🗑️ Collections nettoyées.');

    // 2. Insérer les étapes du parcours
    await Timeline.insertMany(timelineData);
    console.log('✅ Parcours (Timeline) inséré.');

    // 3. Insérer les projets / accomplissements (KevyLLC, AFB Studio, Yély, etc.)
    await Project.insertMany(projectData);
    console.log('✅ Accomplissements (Projets) insérés.');

    // 4. Insérer le profil d'Architecte ADSA par défaut
    await Profile.create({
      uniqueId: 'main_profile',
      titleLine1: "Je crée des expériences web",
      titleLine2: "qui marquent les esprits.",
      titleLine3: "Architecte de Solutions Digitales (ADSA) & Fullstack Builder",
      subtitle: "Ai-Driven Solutions Architect (ADSA), orienté produit et spécialisé dans le Fullstack ; je mélange intensité visuelle et précision technique pour donner à chaque solution une empreinte unique. Jeune ivoirien étudiant en IACC (Option Contrôle).",
      imageUrl: "/photo-profil.jpg",
      imagePublicId: "local_profile_photo"
    });
    console.log('✅ Profil par défaut inséré.');

    res.status(200).json({ 
      message: "✅ SUCCÈS : Base de données (Timeline, Projets, Profil) remplie avec succès avec les données de prestige d'origine !" 
    });
  } catch (error) {
    console.error(`❌ Erreur seeding: ${error.message}`);
    res.status(500).json({ 
      message: "❌ ERREUR lors du seeding généralisé", 
      error: error.message 
    });
  }
};