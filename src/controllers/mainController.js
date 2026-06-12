/*
function index(req, res) {

    res.render('index');
}

module.exports = {
    index
};

const pool = require('../config/db');

async function index(req, res) {

    try {

        const result = await pool.query('SELECT NOW()');

        console.log(result.rows);

        res.render('index');

    } catch (error) {

        console.log(error);
    }
}

module.exports = {
    index
};


function index(req, res) {
    res.render('index', {
        user: req.session.user
    });
}

module.exports = {
    index
};*/

const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Follow = require('../models/Follow');

async function index(req, res) {
    try {
        const publicaciones = await Post.findAll();

        for (const publicacion of publicaciones) {
            if (publicacion.id_imagen) {
                publicacion.comentarios = await Comment.findByImage(publicacion.id_imagen);
            } else {
                publicacion.comentarios = [];
            }

             if (
                req.session.user &&
                publicacion.id_usuario != req.session.user.id_usuario
            ) {
                publicacion.loSigue = await Follow.isFollowing(
                    req.session.user.id_usuario,
                    publicacion.id_usuario
                );
            } else {
                publicacion.loSigue = false;
            }

        }

        res.render('index', {
            user: req.session.user,
            publicaciones
        });

    } catch (error) {
        console.error(error);
        res.send('Error al cargar el inicio');
    }
}

async function buscar(req, res) {
    try {

        const termino = req.query.q;

        const publicaciones = await Post.search(termino);

        for (const publicacion of publicaciones) {
            if (publicacion.id_imagen) {
                publicacion.comentarios =
                    await Comment.findByImage(publicacion.id_imagen);
            } else {
                publicacion.comentarios = [];
            }
        }

        res.render('index', {
            user: req.session.user,
            publicaciones
        });

    } catch (error) {
        console.error(error);
        res.send('Error al buscar publicaciones');
    }
}

module.exports = {
    index,
    buscar
};

