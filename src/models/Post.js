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
        SELECT
            p.*,
            u.nombre,
            u.apellido,
            i.id_imagen,
            i.imagen_base64,
            COALESCE(ROUND(AVG(v.valor)::numeric, 1), 0) AS promedio_valoracion,
            COUNT(v.id_valoracion) AS cantidad_valoraciones
        FROM publicaciones p
        INNER JOIN usuarios u
            ON p.id_usuario = u.id_usuario
        LEFT JOIN imagenes i
            ON p.id_publicacion = i.id_publicacion
        LEFT JOIN valoraciones v
            ON i.id_imagen = v.id_imagen
        GROUP BY
            p.id_publicacion,
            u.nombre,
            u.apellido,
            i.id_imagen,
            i.imagen_base64
        ORDER BY p.fecha_creacion DESC
    `;

    const result = await pool.query(query);
    return result.rows;
}

module.exports = {
    createPost,
    findAll
};