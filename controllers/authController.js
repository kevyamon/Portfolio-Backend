// kevyamon/portfolio-backend/controllers/authController.js
import generateToken from '../utils/generateToken.js';

// @desc    Connecter l'administrateur
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    generateToken(res, 'admin_user_id');
    res.status(200).json({
      message: 'Authentification réussie',
    });
  } else {
    res.status(401).json({ message: 'Mot de passe invalide' });
  }
};

// --- NOUVELLE FONCTION ---
// @desc    Vérifier le statut de l'authentification
// @route   GET /api/auth/status
// @access  Privé
const checkAuthStatus = (req, res) => {
  // Si le middleware 'protect' (garde du corps) nous a laissé arriver
  // jusqu'ici, cela signifie que le cookie JWT est valide.
  // Nous n'avons rien d'autre à faire que de le confirmer.
  res.status(200).json({ isLoggedIn: true });
};

export { loginAdmin, checkAuthStatus }; // Ajouter checkAuthStatus à l'export