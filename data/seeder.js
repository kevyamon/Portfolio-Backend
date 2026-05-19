// kevyamon/portfolio-backend/data/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import connectDB from '../config/db.js';
import Timeline from '../models/TimelineModel.js';
import Project from '../models/ProjectModel.js';
import Profile from '../models/ProfileModel.js';
import timelineData from './timelineData.js';
import projectData from './projectData.js';

// Configuration de serveurs DNS publics stables (Google DNS) pour contourner les blocages SRV des FAI locaux
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const importData = async () => {
  try {
    console.log('🚀 Démarrage du seeding global...');
    
    // 1. Vider toutes les collections
    await Timeline.deleteMany();
    await Project.deleteMany();
    await Profile.deleteMany();
    console.log('🗑️  Anciennes données supprimées (Timeline, Projects, Profile).');

    // 2. Insérer les nouvelles données
    await Timeline.insertMany(timelineData);
    console.log('✅ Données du Parcours (Timeline) importées avec succès !');

    await Project.insertMany(projectData);
    console.log('✅ Données des Accomplissements (Projects) importées avec succès !');

    await Profile.create({
      uniqueId: 'main_profile',
      titleLine1: "Je crée des expériences web",
      titleLine2: "qui marquent les esprits.",
      titleLine3: "Architecte de Solutions Digitales (ADSA) & Fullstack Builder",
      subtitle: "Ai-Driven Solutions Architect (ADSA), orienté produit et spécialisé dans le Fullstack ; je mélange intensité visuelle et précision technique pour donner à chaque solution une empreinte unique. Jeune ivoirien étudiant en IACC (Option Contrôle).",
      imageUrl: "/photo-profile.png",
      imagePublicId: "local_profile_photo"
    });
    console.log('✅ Profil par défaut importé avec succès !');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Erreur lors de l'import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Timeline.deleteMany();
    await Project.deleteMany();
    await Profile.deleteMany();
    console.log('🔥 Toutes les données détruites (Timeline, Projects, Profile) !');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
    process.exit(1);
  }
};

const run = async () => {
  try {
    // Connexion à la base de données MongoDB
    await connectDB();
    
    if (process.argv[2] === '-d') {
      await destroyData();
    } else {
      await importData();
    }
  } catch (error) {
    console.error("Impossible de se connecter pour le seeding :", error);
    process.exit(1);
  }
};

run();