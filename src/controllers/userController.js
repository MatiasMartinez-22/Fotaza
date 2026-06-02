const bcrypt = require('bcrypt');
const User = require('../models/User');

function showSignup(req, res) {
    res.render('signup');
}

function showLogin(req, res) {
    res.render('login');
}

async function signup(req, res) {
    const { nombre, apellido, email, password } = req.body;

    const userExists = await User.findByEmail(email);

    if (userExists) {
        return res.render('signup', {
            error: 'El email ya está registrado'
        });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.createUser(nombre, apellido, email, passwordHash);

    req.session.user = user;

    res.redirect('/');
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
        return res.render('login', {
            error: 'Email o contraseña incorrectos'
        });
    }

    const passwordOk = await bcrypt.compare(password, user.password_hash);

    if (!passwordOk) {
        return res.render('login', {
            error: 'Email o contraseña incorrectos'
        });
    }

    req.session.user = {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email
    };

    res.redirect('/');
}

function logout(req, res) {
    req.session.destroy(() => {
        res.redirect('/login');
    });
}

module.exports = {
    showSignup,
    showLogin,
    signup,
    login,
    logout
};