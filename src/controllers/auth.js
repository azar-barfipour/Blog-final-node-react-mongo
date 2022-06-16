const { signup } = require("../middleware/auth.service");
const { signin } = require("../middleware/auth.service");

const signInController = async (req, res, next) => {
  const { email, password } = req.body;
  const signInService = await signin(email, password);
  return res.json(signInService);
};

const signUpController = async (req, res, next) => {
  const signUpService = await signup(req.body);
  return res.json(signUpService);
};

module.exports = {
  signUpController,
  signInController,
};
