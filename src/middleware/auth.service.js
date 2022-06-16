const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = 10;

const signin = async (email, password) => {
  let user = await User.findOne({ email: email });

  if (!user) throw new Error("User does not exists. Please try again");

  const isValid = await bcrypt.compare(password, user.password);

  const token = JWT.sign({ id: user._id }, JWTSecret);

  if (isValid) {
    return (data = {
      userId: user._id,
      email: user.email,
      name: user.name,
      token,
    });
  } else {
    throw new Error("Incorrect Password");
  }
};
const signup = async (data) => {
  let user = await User.findOne({ email: data.email });
  if (user) throw new Error("Email already exists", 422);

  user = new User(data);
  const token = JWT.sign(
    {
      id: user._id,
    },
    JWTSecret
  );
  await user.save();

  return (data = {
    userId: user._id,
    email: user.email,
    name: user.name,
    token,
  });
};

module.exports = {
  signin,
  signup,
};
