// kevyamon/portfolio-backend/controllers/authController.js
import generateToken from '../utils/generateToken.js';

// @desc    Connecter l'administrateur
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = (req, res) => {
  const { password } = req.body;

  // 1. On vérifie si le mot de passe envoyé correspond à celui dans .env
  if (password === process.env.ADMIN_PASSWORD) {
    // 2. Si oui, on génère un "pass" (jeton)
    generateToken(res, 'admin_user_id'); // L'ID est statique car il n'y a qu'un admin

    // 3. On répond que c'est un succès
    res.status(200).json({
      message: 'Authentification réussie',
    });
  } else {
    // 4. Si non, on renvoie une erreur "Non autorisé"
    res.status(401).json({ message: 'Mot de passe invalide' });
  }
};

export { loginAdmin };