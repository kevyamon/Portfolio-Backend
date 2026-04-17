//kevyamon/portfolio-backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

// Middlewares personnalisés
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import timelineRoutes from './routes/timelineRoutes.js'; 
import projectRoutes from './routes/projectRoutes.js'; 
import messageRoutes from './routes/messageRoutes.js';
import seedRoutes from './routes/seedRoutes.js'; 
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Sécurisation des en-têtes HTTP
app.use(helmet());

// Limiteur de requêtes pour prévenir les attaques DDoS et le spam
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limite à 150 requêtes par IP pour la fenêtre de temps
  message: { message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.' }
});

const whitelist = [
  process.env.FRONTEND_URL, 
  'http://localhost:5173' 
];

const io = new Server(server, {
  cors: {
    origin: whitelist,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

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

// Appliquer le limiteur uniquement sur les routes API
app.use('/api', apiLimiter);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('/', (req, res) => {
  res.send('API du Portfolio (avec Socket.io) en ligne et securisee.');
});

app.use('/api/auth', authRoutes);
app.use('/api/timeline', timelineRoutes); 
app.use('/api/projects', projectRoutes); 
app.use('/api/messages', messageRoutes);
app.use('/api/seed', seedRoutes); 
app.use('/api/profile', profileRoutes);

// Middlewares de gestion des erreurs (doivent être placés APRÈS les routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Serveur Socket+Express demarre sur le port ${PORT} avec mode de securite actif.`);
});