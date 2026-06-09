const Rating = require('../models/Rating');

exports.create = async (req, res) => {
    try {

        const idImagen = req.params.idImagen;
        const idUsuario = req.session.user.id_usuario;
        const valor = parseInt(req.body.valor);

        await Rating.createRating(
            idImagen,
            idUsuario,
            valor
        );

        res.redirect('/');

    } catch (error) {

        console.error(error);
        res.send("Error al guardar valoración");

    }
};