// kevyamon/portfolio-backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Outil de sécurité
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

// Importer nos routes
import authRoutes from './routes/authRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js'; 
import projectRoutes from './routes/projectRoutes.js'; 
import messageRoutes from './routes/messageRoutes.js'; 

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// --- CONFIGURATION CORS AVANCÉE ---
// La "liste blanche" des URL qui ont le droit de parler à notre API
const whitelist = [
  process.env.FRONTEND_URL, // http://localhost:5173
  // Quand votre frontend sera déployé (ex: sur Vercel),
  // nous ajouterons son URL ici dans les variables de Render.
];

const corsOptions = {
  origin: function (origin, callback) {
    // Si l'URL qui appelle est dans notre liste blanche
    // (ou si c'est un appel direct sans 'origin', comme Postman)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // On l'autorise
    } else {
      callback(new Error('Non autorisé par CORS')); // On la bloque
    }
  },
  credentials: true, // Autorise l'envoi de cookies (pour notre "pass" JWT)
};

app.use(cors(corsOptions)); // 1. Utiliser notre config CORS
// ------------------------------------

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

// Route de test
app.get('/', (req, res) => {
  res.send('API du Portfolio... en construction ! 🚀');
});

// Utiliser nos routes
app.use('/api/auth', authRoutes);
app.use('/api/timeline', timelineRoutes); 
app.use('/api/projects', projectRoutes); 
app.use('/api/messages', messageRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré en mode ${process.env.NODE_ENV} sur le port ${PORT}`);
});