const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: '¡Servidor funcionando correctamente!' });
});

module.exports = router;