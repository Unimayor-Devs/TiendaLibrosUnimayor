// backend/adminScript.js
const { deleteUserFromAuth } = require('./functions/services/adminService');

// UID del usuario a eliminar (puedes cambiarlo por el UID que necesites)
const uid = 'UID_DEL_USUARIO_A_ELIMINAR';

// Función principal para ejecutar el script
async function main() {
  try {
    await deleteUserFromAuth(uid);
    console.log('Operación completada.');
  } catch (error) {
    console.error('Error en la operación:', error);
  }
}

main();
