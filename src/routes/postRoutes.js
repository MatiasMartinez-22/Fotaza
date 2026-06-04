const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const postController = require('../controllers/postController');

router.get(
    '/crear-publicacion',
    authMiddleware,
    postController.showCreateForm
);

router.post(
    '/crear-publicacion',
    authMiddleware,
    postController.create
);

module.exports = router;