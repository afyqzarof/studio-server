const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const inventory = await knex("user").select("id", "username", "email");
    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).send(`Error retrieving users: ${err}`);
  }
};

const getBoards = async (req, res) => {
  try {
    const { userId } = req.params;
    const boards = await knex("board").where({ user_id: userId });
    res.json(boards);
  } catch (err) {
    res.status(400).send(`Error retrieving boards: ${err}`);
  }
};

module.exports = {
  index,
  getBoards,
};
