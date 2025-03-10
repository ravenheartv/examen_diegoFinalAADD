const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: '¡Servidor funcionando estupendamente idaira :3!' });
});

module.exports = router;