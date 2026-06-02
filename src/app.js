const db = require('./config/db');

db.query('SELECT NOW()')
    .then(res => console.log(res.rows))
    .catch(err => console.log(err));

const express = require('express');
const path = require('path');
const session = require('express-session');

const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configuración
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'fotaza_secret',
    resave: false,
    saveUninitialized: false
}));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', mainRoutes);
app.use('/', userRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});