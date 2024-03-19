import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

import knex from "../configs/knex.config";

const index = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  try {
    const decoded: JwtPayload = jwt.verify(
      authToken,
      process.env.JWT_SECRET
    ) as JwtPayload;

    const inventory = await knex("user")
      .select("username", "email", "bio", "link")
      .where({ id: decoded.id })
      .first();
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).send(`Error retrieving users: ${err}`);
  }
};

const getBoards = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  try {
    const decoded: JwtPayload = jwt.verify(
      authToken,
      process.env.JWT_SECRET
    ) as JwtPayload;
    const boards = await knex("board").where({ user_id: decoded.id });
    res.json(boards);
  } catch (err) {
    res.status(500).send(`Error retrieving boards: ${err}`);
  }
};

const register = async (req: Request, res: Response) => {
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
    return res.status(201).json({ username, email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed registration" });
  }
};

const login = async (req: Request, res: Response) => {
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
    return res.status(500).json({ message: "Failed login" });
  }
};

const updateDetails = async (req: Request, res: Response) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const { username, bio, link, email } = req.body;

  if (!username || !email || !link || !email) {
    return res.status(400).send("Please enter all fields");
  }

  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded: JwtPayload = jwt.verify(
      authToken,
      process.env.JWT_SECRET
    ) as JwtPayload;

    const updateUser: number = await knex("user")
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
    res.status(500).send(error);
  }
};

const userController = {
  index,
  getBoards,
  register,
  login,
  updateDetails,
};
export default userController;
