const pool = require('../config/db');

async function createRating(idImagen, idUsuario, valor) {
    const query = `
        INSERT INTO valoraciones (id_imagen, id_usuario, valor)
        VALUES ($1, $2, $3)
        ON CONFLICT (id_imagen, id_usuario)
        DO UPDATE SET valor = EXCLUDED.valor
        RETURNING *
    `;

    const result = await pool.query(query, [
        idImagen,
        idUsuario,
        valor
    ]);

    return result.rows[0];
}

module.exports = {
    createRating
};