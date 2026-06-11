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