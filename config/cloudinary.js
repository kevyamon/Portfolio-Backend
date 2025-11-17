// kevyamon/portfolio-backend/config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configuration de la connexion à votre compte Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurer le "stockage" Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio', // Le nom du dossier sur Cloudinary où les fichiers seront stockés
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov'], // Formats autorisés
    // 'resource_type: "auto"' permet à Cloudinary de détecter s'il s'agit d'une image ou d'une vidéo
    resource_type: 'auto', 
  },
});

// L'outil "uploader" que nous utiliserons
const upload = multer({ storage: storage });

export { cloudinary, upload };