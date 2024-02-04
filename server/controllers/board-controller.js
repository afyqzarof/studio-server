const knex = require("knex")(require("../../db/knexfile"));
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const getImageIds = require("../utils/get-image-pin");

const getPins = async (req, res) => {
  const { boardId } = req.params;
  const pins = await knex("pin").where({ board_id: boardId });
  res.json(pins);
};

const getBoardDetails = async (req, res) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

  const { boardId } = req.params;
  const boardDetails = await knex("board").where({ id: boardId }).first();

  if (!boardDetails) {
    return res.status(404).send("No board found");
  }

  if (boardDetails.user_id !== decoded.id) {
    return res.status(401).send("you are not allowed to edit this board");
  }
  res.json(boardDetails);
};

const getPublicBoards = async (req, res) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];
  if (authToken === "demo") {
    const publicBoards = await knex("board")
      .join("user", "user.id", "board.user_id")
      .select(
        "user.username",
        "board.title",
        "board.thumbnail",
        "board.id",
        "board.created_at",
        "board.description",
        "board.category",
        "board.user_id"
      );
    return res.json(publicBoards);
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const publicBoards = await knex("board")
      .join("user", "user.id", "board.user_id")
      .select(
        "user.username",
        "board.title",
        "board.thumbnail",
        "board.id",
        "board.created_at",
        "board.description",
        "board.category",
        "board.user_id"
      )
      .where({ is_public: true });

    const filteredBoards = publicBoards.filter(
      (board) => board.user_id !== decoded.id
    );
    res.json(filteredBoards);
  } catch (error) {
    res.status(400).send(error);
  }
};

const newBoard = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const userId = decoded.id;

    const newBoard = {
      id: nanoid(15),
      user_id: userId,
    };

    await knex("board").insert(newBoard);
    res.json(newBoard);
  } catch (error) {
    res.status(400).send(error);
  }
};
const saveBoard = async (req, res) => {
  const { title, boardId, filename } = req.body;

  if (!title || !boardId || !filename) {
    return res.status(400).send("Please have all fields");
  }
  const { thumbnail } = await knex("board").where({ id: boardId }).first();
  if (thumbnail !== "default.png") {
    try {
      fs.unlinkSync(
        path.resolve(__dirname, `../public/thumbnails/${thumbnail}`)
      );
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const boardsUpdated = await knex("board")
      .where({ id: boardId })
      .update("title", title)
      .update("thumbnail", filename);

    if (!boardsUpdated) {
      return res.status(404).send("Could not find board to update");
    }

    const updatedBoard = await knex("board").where({ id: boardId }).first();
    res.json(updatedBoard);
  } catch (error) {
    res.status(400).send(error);
  }
};

const savePins = async (req, res) => {
  const { boardId } = req.params;
  const { newPins } = req.body;
  if (newPins.length === 0) {
    return res.send("no pins to update");
  }

  const oldPins = await knex("pin").where({ board_id: boardId });
  const oldImgPinIds = getImageIds(oldPins, true);
  const newImgPinsId = getImageIds(newPins, false).map((imgObj) => imgObj.id);

  oldImgPinIds.forEach((imgObj) => {
    if (!newImgPinsId.includes(imgObj.id)) {
      try {
        fs.unlinkSync(
          path.resolve(__dirname, `../public/uploads/${imgObj.filename}`)
        );
        // console.log("deleted: " + imgObj.filename);
      } catch (error) {
        console.log(error);
      }
    }
  });

  await knex("pin").where({ board_id: boardId }).del();

  const insertedPins = await knex("pin").insert(newPins);

  res.json(insertedPins);
};

const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const board = await knex("board").where({ id: boardId }).first();
  if (!board) {
    res.status(404).send("cant find board");
  }

  const oldPins = await knex("pin").where({ board_id: boardId });
  const oldImgPinIds = getImageIds(oldPins, true);
  oldImgPinIds.forEach((imgObj) => {
    try {
      fs.unlinkSync(
        path.resolve(__dirname, `../public/uploads/${imgObj.filename}`)
      );
      console.log("deleted: " + imgObj.filename);
    } catch (error) {
      console.log(error);
    }
  });

  const deleteBoard = await knex("board").where({ id: boardId }).first().del();
  console.log(deleteBoard);

  res.status(204).send("delete successful");
};
module.exports = {
  getPins,
  getBoardDetails,
  getPublicBoards,
  newBoard,
  saveBoard,
  savePins,
  deleteBoard,
};
