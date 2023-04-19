const { Router } = require("express");
const { createUserValidator, updateUserValidator } = require("../validators/user.validator");
const { createUser, updateUser, getAllUsers } = require("../controllers/user.controllers");


const router = Router();

router.post("/api/v1/users", createUserValidator, createUser);

router.put("/api/v1/users/:id", updateUser);

router.get("/api/v1/users", getAllUsers)



module.exports = router;