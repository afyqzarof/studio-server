const usersData = require("../seed-data/users");
const boardsData = require("../seed-data/boards");

exports.seed = async function (knex) {
  await knex("board").del();
  await knex("user").del();
  await knex("user").insert(usersData);
  await knex("board").insert(boardsData);
};
