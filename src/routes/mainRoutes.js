const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', mainController.index);

router.get('/privado', authMiddleware, (req, res) => {
    res.send('Zona privada');
});

module.exports = router;