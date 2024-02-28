const knex = require("../configs/knex-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const index = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const inventory = await knex("user")
      .select("username", "email", "bio", "link")
      .where({ id: decoded.id })
      .first();
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
    const [createdUserId] = await knex("user").insert(newUser);
    return res.status(201).json({ id: createdUserId, username, email });
  } catch (error) {
    return res.status(500).json({ message: "Failed registration", error });
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
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET
    );
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed login" });
  }
};

const updateDetails = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const { username, bio, link, email } = req.body;

  if (!username || !email) {
    return res.status(400).send("Please enter all fields");
  }

  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const updateUser = await knex("user")
      .where({ id: decoded.id })
      .update("username", username)
      .update("bio", bio)
      .update("link", link)
      .update("email", email);
    if (updateUser === 0) {
      res.status(404).send("user not found");
    }
    res.json("update successful");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  index,
  getBoards,
  register,
  login,
  updateDetails,
};
