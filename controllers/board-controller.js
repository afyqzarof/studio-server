const knex = require("knex")(require("../knexfile"));

const getPins = async (req, res) => {
  const { boardId } = req.params;
  const pins = await knex("pin").where({ board_id: boardId });
  res.json(pins);
};

module.exports = {
  getPins,
};
