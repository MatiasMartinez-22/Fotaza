const Post = require('../models/Post');

exports.showCreateForm = (req, res) => {
    res.render('createPost');
};

exports.create = async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        await Post.createPost(
            req.session.user.id_usuario,
            titulo,
            descripcion
        );

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.send('Error al crear publicación');
    }
};

exports.list = async (req, res) => {
    try {
        const publicaciones = await Post.findAll();

        res.render('index', {
            publicaciones,
            user: req.session.user
        });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar publicaciones');
    }
};