const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const inventory = await knex("user").select("id", "username", "email");
    res.status(200).json(inventory);
  } catch (err) {
    res.status(400).send(`Error retrieving inventory: ${err}`);
  }
};

module.exports = {
  index,
};
