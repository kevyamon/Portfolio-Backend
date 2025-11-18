// kevyamon/portfolio-backend/controllers/profileController.js
import Profile from '../models/ProfileModel.js';
import { cloudinary } from '../config/cloudinary.js';

// @desc    Récupérer le profil (Public)
// @route   GET /api/profile
const getProfile = async (req, res) => {
  try {
    // On cherche le profil unique
    let profile = await Profile.findOne({ uniqueId: 'main_profile' });
    
    // Si aucun profil n'existe (premier lancement), on renvoie null ou un objet vide
    if (!profile) {
      return res.status(200).json(null); 
    }
    
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

// @desc    Mettre à jour ou Créer le profil (Admin)
// @route   PUT /api/profile
const updateProfile = async (req, res) => {
  try {
    const { titleLine1, titleLine2, titleLine3, subtitle } = req.body;
    
    // 1. Chercher le profil existant
    let profile = await Profile.findOne({ uniqueId: 'main_profile' });

    // 2. Gestion de l'image
    let imageUrl, imagePublicId;

    if (req.file) {
      // Si une nouvelle image est envoyée
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;

      // Si un profil existait déjà avec une image, on supprime l'ancienne
      if (profile && profile.imagePublicId) {
        await cloudinary.uploader.destroy(profile.imagePublicId);
      }
    } else {
      // Si pas de nouvelle image, on garde l'ancienne (si elle existe)
      imageUrl = profile?.imageUrl;
      imagePublicId = profile?.imagePublicId;
    }

    // 3. Mise à jour ou Création
    if (profile) {
      // Mise à jour
      profile.titleLine1 = titleLine1 || profile.titleLine1;
      profile.titleLine2 = titleLine2 || profile.titleLine2;
      profile.titleLine3 = titleLine3 || profile.titleLine3;
      profile.subtitle = subtitle || profile.subtitle;
      
      if (imageUrl) {
        profile.imageUrl = imageUrl;
        profile.imagePublicId = imagePublicId;
      }

      const updatedProfile = await profile.save();
      
      // 🔥 SOCKET
      if (req.io) req.io.emit('profile_updated');
      
      res.status(200).json(updatedProfile);

    } else {
      // Création (premier profil)
      if (!req.file) {
        return res.status(400).json({ message: "Une image est requise pour la création initiale." });
      }

      const newProfile = new Profile({
        titleLine1,
        titleLine2,
        titleLine3,
        subtitle,
        imageUrl,
        imagePublicId
      });

      const savedProfile = await newProfile.save();
      
      // 🔥 SOCKET
      if (req.io) req.io.emit('profile_updated');

      res.status(201).json(savedProfile);
    }

  } catch (error) {
    res.status(400).json({ message: 'Erreur mise à jour profil', error: error.message });
  }
};

export { getProfile, updateProfile };