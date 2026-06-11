const pool = require('../config/db');

async function follow(idSeguidor, idSeguido) {
    const query = `
        INSERT INTO seguidores (id_seguidor, id_seguido)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
    `;

    await pool.query(query, [idSeguidor, idSeguido]);
}

async function unfollow(idSeguidor, idSeguido) {
    const query = `
        DELETE FROM seguidores
        WHERE id_seguidor = $1
        AND id_seguido = $2
    `;

    await pool.query(query, [idSeguidor, idSeguido]);
}

async function isFollowing(idSeguidor, idSeguido) {
    const query = `
        SELECT *
        FROM seguidores
        WHERE id_seguidor = $1
        AND id_seguido = $2
    `;

    const result = await pool.query(query, [idSeguidor, idSeguido]);

    return result.rows.length > 0;
}

async function countFollowers(idUsuario) {
    const query = `
        SELECT COUNT(*) AS total
        FROM seguidores
        WHERE id_seguido = $1
    `;

    const result = await pool.query(query, [idUsuario]);

    return result.rows[0].total;
}

async function countFollowing(idUsuario) {
    const query = `
        SELECT COUNT(*) AS total
        FROM seguidores
        WHERE id_seguidor = $1
    `;

    const result = await pool.query(query, [idUsuario]);

    return result.rows[0].total;
}

module.exports = {
    follow,
    unfollow,
    isFollowing,
    countFollowers,
    countFollowing
};