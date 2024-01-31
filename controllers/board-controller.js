const knex = require("knex")(require("../knexfile"));

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
      "board.created_at"
    )
    .where({ is_public: true });
  res.json(publicBoards);
};

module.exports = {
  getPins,
  getBoardDetails,
  getPublicBoards,
};
