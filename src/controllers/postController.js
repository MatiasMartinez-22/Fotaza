const Post = require('../models/Post');
const Image = require('../models/Image');

exports.showCreateForm = (req, res) => {
    res.render('createPost');
};

exports.create = async (req, res) => {
    try {
        const {
            titulo,
            descripcion,
            imagen_base64,
            nombre_original,
            mime_type
        } = req.body;

        const publicacion = await Post.createPost(
            req.session.user.id_usuario,
            titulo,
            descripcion
        );

        if (imagen_base64) {
            await Image.createImage(
                publicacion.id_publicacion,
                nombre_original,
                mime_type,
                imagen_base64
            );
        }

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