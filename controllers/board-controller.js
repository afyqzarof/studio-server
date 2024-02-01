const knex = require("knex")(require("../knexfile"));
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

const getPins = async (req, res) => {
  const { boardId } = req.params;
  const pins = await knex("pin").where({ board_id: boardId });
  res.json(pins);
};

const getBoardDetails = async (req, res) => {
  const { boardId } = req.params;
  const boardDetails = await knex("board").where({ id: boardId }).first();

  if (!boardDetails) {
    return res.status(404).send("No board found");
  }
  res.json(boardDetails);
};

const getPublicBoards = async (req, res) => {
  const publicBoards = await knex("board")
    .join("user", "user.id", "board.user_id")
    .select(
      "user.username",
      "board.title",
      "board.thumbnail",
      "board.id",
      "board.created_at",
      "board.description",
      "board.category"
    )
    .where({ is_public: true });
  res.json(publicBoards);
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
    console.log(newBoard);

    await knex("board").insert(newBoard);
    res.json(newBoard);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getPins,
  getBoardDetails,
  getPublicBoards,
  newBoard,
};
