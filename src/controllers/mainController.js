/*
function index(req, res) {

    res.render('index');
}

module.exports = {
    index
};*/

const pool = require('../config/db');

async function index(req, res) {

    try {

        const result = await pool.query('SELECT NOW()');

        console.log(result.rows);

        res.render('index');

    } catch (error) {

        console.log(error);
    }
}

module.exports = {
    index
};