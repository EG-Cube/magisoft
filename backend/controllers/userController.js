const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.json({ mssg: "login user" });
};

// signup a user
const signupUser = async (req, res) => {
  const { firstName, lastName, country, email, password } = req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      country,
      email,
      password
    );

    const token = createToken(user._id);
    console.log("Token : ", token);

    res.status(200).json({
      email,
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
