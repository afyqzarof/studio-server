import usersData from "../seed-data/users";
import boardsData from "../seed-data/boards";
import pinsData from "../seed-data/pins";

import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const formattedPins = pinsData.map((pin) => {
    const { data } = pin;
    return {
      ...pin,
      data: JSON.stringify(data),
    };
  });

  await knex("pin").del();
  await knex("board").del();
  await knex("user").del();
  await knex("user").insert(usersData);
  await knex("board").insert(boardsData);
  await knex("pin").insert(formattedPins);
}
