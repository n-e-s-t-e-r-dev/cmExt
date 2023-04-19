const AuthServices = require("../services/auth.services");
const UsersServices = require("../services/user.services");
const transporter = require("../utils/mailer")

const createUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        console.log(newUser);
        const user = await UsersServices.create(newUser);
        if (user) {
            await transporter.sendMail({
                from: process.env.MAILER_CONFIG_USER,
                to: user.email,
                subject: "Bienvenido",
                html: `
          <p>Hola ${user.username} Bienvenido a mi Extension</p>
          <p>Podras llegar a muchos clientes con ella </p>`,
            });
        }


        res.status(201).json({
            success: true
        });

    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        await UsersServices.update(id, { avatar: req.file?.path });

        res.status(201).json({ success: true });
    } catch (error) {
        next(error)
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const result = res.body
        const users = await UsersServices.getUsers(result);
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
};

const getUser = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await UsersServices.getUser(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    getUser
};