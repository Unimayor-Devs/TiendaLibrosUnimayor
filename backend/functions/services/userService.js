/* const admin = require("firebase-admin");

const deleteUserFromAuth = async (uid) => {
  try {
    await admin.auth().deleteUser(uid);
    console.log("Usuario eliminado correctamente");
    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return { success: false, error: "Error al eliminar usuario" };
  }
};

module.exports = {
  deleteUserFromAuth,
};
*/
