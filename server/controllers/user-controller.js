const knex = require("knex")(require("../../db/knexfile"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const index = async (_req, res) => {
  try {
    const inventory = await knex("user").select("id", "username", "email");
    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).send(`Error retrieving users: ${err}`);
  }
};

const getBoards = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const boards = await knex("board").where({ user_id: decoded.id });
    res.json(boards);
  } catch (err) {
    res.status(400).send(`Error retrieving boards: ${err}`);
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("please enter all required fields");
  }

  const hashedPassword = bcrypt.hashSync(password, 6);

  const newUser = {
    username,
    email,
    password: hashedPassword,
  };

  try {
    await knex("user").insert(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed registration" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Please enter all required fields");
  }

  try {
    const user = await knex("user").where({ username: username }).first();
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed login" });
  }
};

module.exports = {
  index,
  getBoards,
  register,
  login,
};
