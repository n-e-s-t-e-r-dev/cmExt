const UserServices = require("../services/user.services");
const AuthServices = require("../services/auth.services");


const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserServices.getUser(email);
        if (!user) {
            return next({
                status: 400,
                message: "Invalid email",
                errorName: "User not found",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    userLogin,
};