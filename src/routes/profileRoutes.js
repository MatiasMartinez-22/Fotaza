const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/perfil/:id', authMiddleware, profileController.show);

module.exports = router;