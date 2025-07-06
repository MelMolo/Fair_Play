const express = require('express');
const { register } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
// Ajoutez d'autres routes (/login, /refresh, /forgot-password) ici

module.exports = router;