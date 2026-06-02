const pool = require('../config/db');

async function findByEmail(email) {
    const query = `
        SELECT *
        FROM usuarios
        WHERE email = $1
    `;

    const result = await pool.query(query, [email]);
    return result.rows[0];
}

async function createUser(nombre, apellido, email, passwordHash) {
    const query = `
        INSERT INTO usuarios (id_rol, nombre, apellido, email, password_hash)
        VALUES (1, $1, $2, $3, $4)
        RETURNING id_usuario, nombre, apellido, email
    `;

    const result = await pool.query(query, [
        nombre,
        apellido,
        email,
        passwordHash
    ]);

    return result.rows[0];
}

module.exports = {
    findByEmail,
    createUser
};