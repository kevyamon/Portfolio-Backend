// kevyamon/portfolio-backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (res, adminId) => {
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: '1d', // 1 jour
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    
    // CORRECTION :
    // 1. 'secure' doit être 'true' car notre backend est en HTTPS sur Render.
    secure: true, 
    
    // 2. C'EST LA CORRECTION PRINCIPALE :
    // On passe de 'strict' à 'None' pour autoriser les cookies cross-domain.
    sameSite: 'None', 
    
    maxAge: 24 * 60 * 60 * 1000, // 1 jour
  });
};

export default generateToken;