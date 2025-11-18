// kevyamon/portfolio-backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

// Importer nos routes
import authRoutes from './routes/authRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js'; 
import projectRoutes from './routes/projectRoutes.js'; 
import messageRoutes from './routes/messageRoutes.js';
import seedRoutes from './routes/seedRoutes.js'; // <--- IMPORT DU SEEDER

dotenv.config();
connectDB();

const app = express();

const whitelist = [
  process.env.FRONTEND_URL, 
  'http://localhost:5173' 
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Non autorisé par CORS'));
    }
  },
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); 

app.get('/', (req, res) => {
  res.send('API du Portfolio... en ligne ! 🚀');
});

// Utiliser nos routes
app.use('/api/auth', authRoutes);
app.use('/api/timeline', timelineRoutes); 
app.use('/api/projects', projectRoutes); 
app.use('/api/messages', messageRoutes);
app.use('/api/seed', seedRoutes); // <--- NOUVELLE ROUTE TEMPORAIRE

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 