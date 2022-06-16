const { sign } = require("jsonwebtoken");

const router = require("express").Router();

const { signInController, signUpController } = require("../controllers/auth");

router.post("/auth/signin", signInController);
router.post("/auth/signup", signUpController);

module.exports = router;
