const Comment = require('../models/Comment');

exports.create = async (req, res) => {
    try {
        const { id_imagen, texto } = req.body;

        await Comment.createComment(
            id_imagen,
            req.session.user.id_usuario,
            texto
        );

        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.send('Error al crear comentario');
    }
};