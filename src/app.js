const db = require("./config/db");

db.query("SELECT NOW()")
    .then(res => console.log(res.rows))
    .catch(err => console.log(err));

const express = require('express');
const path = require('path');

const app = express();

const mainRoutes = require('./routes/mainRoutes');

// Configuración
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', mainRoutes);

// Puerto
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});

