import request from "supertest";
import app from "../../app";
import knex from "../../configs/knex.config";
import jwt from "jsonwebtoken";
import { userId, authHeader } from "../helpers/test.setup";

const route = "/users";
// const token = jwt.sign(
//   { id: 1, username: "nuclear.instruments", role: "standard user" },
//   process.env.JWT_SECRET!
// );
type UserDetails = {
  bio: string;
  email: string;
  link: string;
  username: string;
};
const userDetails: UserDetails = {
  bio: "indie bedroom artist / professional sad boi",
  email: "nuclear@instruments.my",
  link: "https://www.instagram.com/nuclear.instruments",
  username: "nuclear.instruments",
};

// beforeAll(async () => {
//   await knex.migrate.latest();
//   await knex.seed.run();
// });

// beforeEach(async () => {
//   await knex.seed.run();
// });

// afterAll(async () => {
//   await knex.migrate.rollback();
//   await knex.destroy();
// });

describe("GET /users", () => {
  it("should return 401 with no login header", async () => {
    const res = await request(app).get(route);
    expect(res.statusCode).toBe(401);
  });
  it("should return user details", async () => {
    const res = await request(app).get(route).set(authHeader);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject<UserDetails>(userDetails);
  });
});
