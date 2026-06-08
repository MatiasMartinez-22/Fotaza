const pool = require('../config/db');

async function createImage(idPublicacion, nombreOriginal, mimeType, imagenBase64) {
    const query = `
        INSERT INTO imagenes (
            id_publicacion,
            nombre_original,
            mime_type,
            imagen_base64
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const result = await pool.query(query, [
        idPublicacion,
        nombreOriginal,
        mimeType,
        imagenBase64
    ]);

    return result.rows[0];
}

module.exports = {
    createImage
};