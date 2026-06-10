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

async function index(req, res) {
    try {
        const publicaciones = await Post.findAll();

        for (const publicacion of publicaciones) {
            if (publicacion.id_imagen) {
                publicacion.comentarios = await Comment.findByImage(publicacion.id_imagen);
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
        res.send('Error al cargar el inicio');
    }
}

module.exports = {
    index
};