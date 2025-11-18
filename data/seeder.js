// kevyamon/portfolio-backend/data/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';

// Importer nos "plans" et nos données
import Timeline from '../models/TimelineModel.js';
import timelineData from './timelineData.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Vider la collection (pour éviter les doublons)
    await Timeline.deleteMany();

    // 2. Insérer nos 4 items
    await Timeline.insertMany(timelineData);

    console.log('Données du Parcours insérées avec succès !');
    process.exit();
  } catch (error) {
    console.error(`Erreur lors de l'import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Timeline.deleteMany();
    console.log('Données du Parcours détruites !');
    process.exit();
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    process.exit(1);
  }
};

// Logique pour exécuter depuis la ligne de commande
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}