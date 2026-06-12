const express = require('express');
const router = express.Router();

const followController = require('../controllers/followController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post(
    "/seguir/:id",
    authMiddleware,
    followController.follow
);

router.post(
    '/dejar-seguir/:id',
    authMiddleware,
    followController.unfollow
);

module.exports = router;