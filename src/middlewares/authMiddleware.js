const { Pool } = require('pg'); // Importa la biblioteca de PostgreSQL para Node.js

const pool = new Pool({
    user: process.env.DB_CONFIG_USERNAME,
    host: process.env.DB_CONFIG_HOST,
    database: process.env.DB_CONFIG_DATABASE,
    password: process.env.DB_CONFIG_PASSWORD,
    port: process.env.DB_CONFIG_PORT,
});

function authMiddleware(req, res, next) {
    const { username, password } = req.body;

    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuario no existe' });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si el usuario existe y la contraseña es correcta, llama a `next()`
        next();
    });
}

module.exports = authMiddleware;