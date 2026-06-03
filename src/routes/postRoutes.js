const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');

router.get(
    '/crear-publicacion',
    authMiddleware,
    postController.showCreatePost
);

module.exports = router;