const usersData = require("../seed-data/users");
const boardsData = require("../seed-data/boards");
const pinsData = require("../seed-data/pins");

exports.seed = async function (knex) {
  await knex("pin").del();
  await knex("board").del();
  await knex("user").del();
  await knex("user").insert(usersData);
  await knex("board").insert(boardsData);
  await knex("pin").insert(pinsData);
};
