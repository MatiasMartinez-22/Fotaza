const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/signup', userController.showSignup);
router.post('/signup', userController.signup);

router.get('/login', userController.showLogin);
router.post('/login', userController.login);

router.post('/logout', userController.logout);

module.exports = router;