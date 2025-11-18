// kevyamon/portfolio-backend/models/ProfileModel.js
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    // On utilise un ID fixe ou unique pour s'assurer qu'il n'y a qu'un seul profil
    uniqueId: { 
      type: String, 
      default: 'main_profile',
      unique: true 
    },
    titleLine1: { type: String, default: 'Bonjour, je suis' },
    titleLine2: { type: String, default: 'Kevy' }, // Le nom en vert
    titleLine3: { type: String, default: 'Étudiant en I.A.C. – Option Contrôle' },
    subtitle: { 
      type: String, 
      default: 'Spécialisé en contrôle qualité, analyse sensorielle et sécurité alimentaire.' 
    },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;