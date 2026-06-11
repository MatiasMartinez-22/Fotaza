const pool = require('../config/db');

async function follow(idSeguidor, idSeguido) {

    const query = `
        INSERT INTO seguidores (id_seguidor, id_seguido)
        VALUES ($1,$2)
        ON CONFLICT DO NOTHING
    `;

    await pool.query(query, [idSeguidor, idSeguido]);
}

module.exports = {
    follow
};