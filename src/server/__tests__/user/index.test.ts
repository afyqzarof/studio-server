import request from "supertest";
import app from "../../app";
import { authHeader } from "../helpers/test.setup";
import knex from "../../configs/knex.config";

const route = "/users";

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
  it("returns 500 if database error", async () => {
    await knex.migrate.rollback();

    const res = await request(app).get(route).set(authHeader);
    expect(res.statusCode).toBe(500);

    await knex.migrate.latest();
  });
});

describe("PATCH /users", () => {
  it("should return 401 with no login header", async () => {
    const res = await request(app).patch(route);
    expect(res.statusCode).toBe(401);
  });
  it("should return 400 with incomplete body", async () => {
    const res = await request(app).patch(route).set(authHeader);
    expect(res.statusCode).toBe(400);
  });
  it("should return updated credentials", async () => {
    const res = await request(app)
      .patch(route)
      .set(authHeader)
      .send({ ...userDetails, username: "new username" });
    expect(res.statusCode).toBe(200);
  });
  it("returns 500 if database error", async () => {
    await knex.migrate.rollback();

    const res = await request(app)
      .patch(route)
      .set(authHeader)
      .send({ ...userDetails, username: "new username" });

    expect(res.statusCode).toBe(500);

    await knex.migrate.latest();
  });
});
