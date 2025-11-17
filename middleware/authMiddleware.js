// kevyamon/portfolio-backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

// 'protect' est notre "garde du corps"
const protect = (req, res, next) => {
  // 1. On essaie de lire le "pass" (jeton) depuis le cookie 'jwt'
  const token = req.cookies.jwt;

  if (token) {
    try {
      // 2. On vérifie si le pass est valide (non expiré, non falsifié)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 3. Si c'est bon, on attache l'info de l'admin à la requête
      // (Pas très utile ici car il n'y a qu'un admin, mais c'est la bonne pratique)
      req.admin = { id: decoded.adminId };
      
      // 4. On laisse la requête continuer vers le contrôleur
      next(); 
    } catch (error) {
      // Le "pass" est invalide (ex: expiré)
      res.status(401).json({ message: 'Non autorisé, jeton invalide' });
    }
  } else {
    // Il n'y a pas de "pass" du tout
    res.status(401).json({ message: 'Non autorisé, pas de jeton' });
  }
};

export { protect };