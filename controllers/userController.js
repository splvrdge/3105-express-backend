const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { fetchUsers, saveUsers, getNextUserId } = require("../models/userModel");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const userSchema = Joi.object({
  id: Joi.number().integer().positive(),
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

async function registerUser(req, res) {
  const { username, email, password } = req.body;
  try {
    await userSchema.validateAsync({ username, email, password });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  const users = fetchUsers();
  const user = users.find((user) => user.email === email);
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: getNextUserId(),
    username,
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  saveUsers(users);
  const token = jwt.sign({ email }, secretKey);
  res.status(201).json({ token });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    await loginSchema.validateAsync({ email, password });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  const users = fetchUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ email: user.email }, secretKey);
  res.status(200).json({ token });
}

async function getUserProfile(req, res) {
  const { email } = req.user;
  const users = fetchUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
}

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
