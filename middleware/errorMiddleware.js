//kevyamon/portfolio-backend/middleware/errorMiddleware.js
// Intercepte les requêtes vers des routes qui n'existent pas
const notFound = (req, res, next) => {
  const error = new Error(`Route non trouvée - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Intercepte toutes les erreurs (y compris celles lancées par MongoDB ou nos contrôleurs)
const errorHandler = (err, req, res, next) => {
  // Si le statut est 200 mais qu'il y a une erreur, on le force à 500 (Erreur Serveur)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Gestion spécifique des erreurs de Cast MongoDB (ex: ID invalide)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Ressource introuvable';
  }

  res.status(statusCode).json({
    message: message,
    // On masque la stack trace en production pour la sécurité
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };