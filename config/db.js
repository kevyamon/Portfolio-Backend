import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

// Configuration de serveurs DNS publics stables (Google DNS) pour contourner les blocages SRV des FAI locaux
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;