require("dotenv").config();
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "missing something here!!" });
  } else {
    try {
      existingUser = await User.findOne({ email: email });
    } catch (error) {
      console.log({ error: erorr.message });
    }
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    try {
      const hashedPassword = bcrypt.hashSync(password);
      await User.create({
        name,
        email,
        password: hashedPassword,
      });
      res.status(200).json({ message: "Signup success" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Error(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30s",
  });

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", user: existingUser, token });
};

const verifyToken = async (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];
  if (!token) {
    res.status(400).json({ message: "No token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "password");
  } catch (err) {
    return new Error(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }
  return res.status(200).json({ user });
};

//ADMIN ONLY !!!
//get all users
const allUsers = async (req, res) => {
  const users = await User.find({});

  return res.status(200).json({ message: users });
};

//delete user
const deleteUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing something here!!!" });
  } else {
    await User.findOneAndDelete({ email: email });
    return res.status(200).json({ message: "Delete success" });
  }
};

module.exports = {
  signup,
  login,
  verifyToken,
  getUser,
  allUsers,
  deleteUser,
};
