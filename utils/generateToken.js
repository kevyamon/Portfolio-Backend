// kevyamon/portfolio-backend/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (res, adminId) => {
  // Nous créons un jeton (un "pass") en utilisant votre clé secrète JWT
  // L'ID 'admin' est juste là pour identifier le jeton
  const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: '1d', // Ce "pass" est valable 1 jour (24h)
  });

  // Nous stockons ce jeton dans un cookie HTTP-Only
  // C'est la méthode la plus sécurisée, elle empêche les scripts
  // malveillants de voler le jeton depuis le navigateur.
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // N'est 'secure' qu'en production (HTTPS)
    sameSite: 'strict', // Protection contre les attaques CSRF
    maxAge: 24 * 60 * 60 * 1000, // 1 jour en millisecondes
  });
};

export default generateToken;