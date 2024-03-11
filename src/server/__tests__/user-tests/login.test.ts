import request from "supertest";
import app from "../../app";
import knex from "../../configs/knex.config";

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(async () => {
  await knex.seed.run();
});

afterAll(async () => {
  await knex.migrate.rollback();
  await knex.destroy();
});

describe("POST /users/login", () => {
  it("should return 400 for no login credentials", async () => {
    const res = await request(app).post("/users/login").send({});
    expect(res.statusCode).toEqual(400);
  });
  it("returns user id and auth token, with status 200", async () => {
    await request(app)
      .post("/users/login")
      .send({ username: "nuclear.instruments", password: "password123" })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          token: expect.stringMatching(
            /^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/
          ),
        });
      });
  });
});
