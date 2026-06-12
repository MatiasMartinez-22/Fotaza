const User = require('../models/User');
const Post = require('../models/Post');
const Follow = require('../models/Follow');

exports.show = async (req, res) => {

    try {

        const idUsuario = req.params.id;

        const usuario = await User.findById(idUsuario);

        const publicaciones = await Post.findByUser(idUsuario);

        const seguidores =
            await Follow.countFollowers(idUsuario);

        const siguiendo =
            await Follow.countFollowing(idUsuario);

        const loSigue = await Follow.isFollowing(
            req.session.user.id_usuario,
            idUsuario
        );

        res.render('profile', {
            user: req.session.user,
            usuario,
            publicaciones,
            seguidores,
            siguiendo,
            loSigue
        });

    } catch (error) {

        console.error(error);

        res.send("Error al cargar perfil");

    }

};