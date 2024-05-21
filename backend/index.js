const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { deleteUserFromAuth } = require('./functions/services/adminService');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.delete('/api/users/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    await deleteUserFromAuth(uid);
    res.status(200).send({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).send({ error: 'Error al eliminar usuario' });
  }
});

app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
