const Follow = require('../models/Follow');

exports.follow = async (req, res) => {

    try{

        await Follow.follow(
            req.session.user.id_usuario,
            req.params.id
        );

        res.redirect(req.get('Referer') || '/');

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

        res.redirect(req.get('Referer') || '/');

    } catch (error) {
        console.error(error);
        res.send('Error al dejar de seguir');
    }
};