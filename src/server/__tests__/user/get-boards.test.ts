import request from "supertest";
import app from "../../app";
import { authHeader } from "../helpers/test.setup";
import knex from "../../configs/knex.config";

const route = "/users/boards";

describe("GET /users/boards", () => {
  it("should return 401 with no login header", async () => {
    const res = await request(app).get(route);
    expect(res.statusCode).toBe(401);
  });
  it("should return boards", async () => {
    const res = await request(app).get(route).set(authHeader);
    expect(res.statusCode).toBe(200);
  });
  it("returns 500 if database error", async () => {
    await knex.migrate.rollback();

    const res = await request(app).get(route).set(authHeader);

    expect(res.statusCode).toBe(500);

    await knex.migrate.latest();
  });
});
