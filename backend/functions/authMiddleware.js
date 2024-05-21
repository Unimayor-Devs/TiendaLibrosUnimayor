// authMiddleware.js

const admin = require("firebase-admin");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({error: "No token provided"});
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({error: "Token invalid or expired"});
  }
};

module.exports = authMiddleware;
