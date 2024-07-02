import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("username").notNullable();
      table.string("email").notNullable();
      table.string("bio");
      table.string("link");
      table.string("password").notNullable();
      table.string("role").defaultTo("standard user");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    })
    .createTable("board", (table) => {
      table.string("id").primary().notNullable();
      table.string("title");
      table.boolean("is_public").notNullable().defaultTo(true);
      table
        .integer("user_id")
        .unsigned()
        .references("user.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("thumbnail").defaultTo("default.png");
      table.string("description");
      table.string("category");
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
      table.string("data", 1000);
      table
        .string("board_id")
        .references("board.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("width");
      table.integer("height");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("pin").dropTable("board").dropTable("user");
}
