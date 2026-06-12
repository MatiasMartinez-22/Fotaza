const Follow = require('../models/Follow');

exports.follow = async (req, res) => {

    try{

        await Follow.follow(
            req.session.user.id_usuario,
            req.params.id
        );

        res.redirect('/');

    }catch(error){

        console.log(error);
        res.send("Error");

    }

}

exports.unfollow = async (req, res) => {
    try {
        await Follow.unfollow(
            req.session.user.id_usuario,
            req.params.id
        );

        res.redirect(`/perfil/${req.params.id}`);

    } catch (error) {
        console.error(error);
        res.send('Error al dejar de seguir');
    }
};