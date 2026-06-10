const pool = require('../config/db');

async function createComment(idImagen, idUsuario, texto) {
    const query = `
        INSERT INTO comentarios (id_imagen, id_usuario, texto)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

    const result = await pool.query(query, [
        idImagen,
        idUsuario,
        texto
    ]);

    return result.rows[0];
}

async function findByImage(idImagen) {
    const query = `
        SELECT
            c.*,
            u.nombre,
            u.apellido
        FROM comentarios c
        INNER JOIN usuarios u
            ON c.id_usuario = u.id_usuario
        WHERE c.id_imagen = $1
        ORDER BY c.fecha_creacion ASC
    `;

    const result = await pool.query(query, [idImagen]);

    return result.rows;
}

module.exports = {
    createComment,
    findByImage
};