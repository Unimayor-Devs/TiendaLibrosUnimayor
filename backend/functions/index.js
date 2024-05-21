const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.deleteUserFromAuth = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", ["http://localhost:3000"]); // Agrega tu dominio aquí
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Permitir solicitudes preflights
    res.status(204).send("");
    return;
  }

  const {uid} = req.body;
  if (!uid) {
    return res.status(400).json({error: "UID es necesario"});
  }

  try {
    await admin.auth().deleteUser(uid);
    return res.status(200).json({message: "Usuario eliminado correctamente"});
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({error: "Error al eliminar usuario"});
  }
});
