const db = require('./config/db');



const express = require('express');
const path = require('path');
const session = require('express-session');

const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const commentRoutes = require('./routes/commentRoutes');
const followRoutes = require('./routes/followRoutes');
const profileRoutes = require('./routes/profileRoutes');
const app = express();

// Configuración
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
app.use('/', postRoutes);
app.use('/', ratingRoutes);
app.use('/', commentRoutes);
app.use("/", followRoutes);
app.use('/', profileRoutes);
// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});