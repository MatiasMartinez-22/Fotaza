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

module.exports = {
    createComment
};