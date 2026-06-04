const pool = require('../config/db');

async function createPost(idUsuario, titulo, descripcion) {
    const query = `
        INSERT INTO publicaciones (id_usuario, titulo, descripcion)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const result = await pool.query(query, [
        idUsuario,
        titulo,
        descripcion
    ]);

    return result.rows[0];
}

async function findAll() {
    const query = `
        SELECT p.*, u.nombre, u.apellido
        FROM publicaciones p
        INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
        ORDER BY p.fecha_creacion DESC
    `;

    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    createPost,
    findAll
};