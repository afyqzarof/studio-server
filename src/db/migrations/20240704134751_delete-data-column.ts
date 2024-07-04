import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pin", (table) => {
    table.dropColumn("data");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("pin", (table) => {
    table.string("data");
  });
}
