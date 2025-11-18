// kevyamon/portfolio-backend/data/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Timeline from '../models/TimelineModel.js';
import timelineData from './timelineData.js';

dotenv.config();

// Note : On n'appelle pas connectDB() ici directement.
// On va l'appeler dans la fonction principale 'run' pour pouvoir l'attendre (await).

const importData = async () => {
  try {
    console.log('🚀 Démarrage du seeding...');
    
    // 1. Vider la collection
    await Timeline.deleteMany();
    console.log('🗑️  Anciennes données supprimées.');

    // 2. Insérer les nouvelles
    await Timeline.insertMany(timelineData);
    console.log('✅ Données du Parcours importées avec succès !');

    process.exit();
  } catch (error) {
    console.error(`❌ Erreur lors de l'import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Timeline.deleteMany();
    console.log('🔥 Données détruites !');
    process.exit();
  } catch (error) {
    console.error(`❌ Erreur: ${error.message}`);
    process.exit(1);
  }
};

// --- NOUVELLE LOGIQUE D'EXÉCUTION SÉCURISÉE ---
const run = async () => {
  try {
    // 1. On ATTEND la connexion avant de faire quoi que ce soit
    await connectDB();
    
    // 2. Une fois connecté, on lance la suite
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