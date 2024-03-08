const knex = require("knex");
const config = require("../../db/knexfile");
const environment = process.env.NODE_ENV || "development";

module.exports = knex(config[environment]);
