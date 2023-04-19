const User  = require('../models/users.models');

async function authMiddleware(req, res, next) {
    const { email, username, password } = req.body;

    try {
        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Usuario no existe' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Si el usuario existe y la contraseña es correcta, llama a `next()`
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = authMiddleware;