// authMiddleware.js

const admin = require('firebase-admin');

const validateFirebaseIdToken = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(403).send('Acceso denegado');
  }
};

module.exports = validateFirebaseIdToken;