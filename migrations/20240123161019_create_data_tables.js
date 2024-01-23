/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("email").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("board", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.boolean("is_public").notNullable().defaultTo(true);
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("pin", (table) => {
      table.string("id").primary().notNullable();
      table.string("type").notNullable();
      table.integer("x_coord").notNullable();
      table.integer("y_coord").notNullable();
      table.string("data");
      table
        .integer("board_id")
        .unsigned()
        .references("board.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("width");
      table.integer("height");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pins").dropTable("board").dropTable("user");
};
