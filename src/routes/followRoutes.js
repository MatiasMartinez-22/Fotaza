const express = require('express');
const router = express.Router();

const followController = require('../controllers/followController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post(
    "/seguir/:id",
    authMiddleware,
    followController.follow
);

module.exports = router;