const request = require("supertest");
const app = require("../app");
const knex = require("../configs/knex-config");

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

describe("POST /users/register", () => {
  it("should return status 400", async () => {
    const res = await request(app).post("/users/register").send({});
    expect(res.statusCode).toEqual(400);
  });
  it("returns bad request if an unknown property is provided in the payload", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({ somethingElse: "Jan" });

    expect(res.statusCode).toEqual(400); // Expecting a 400 status code for a bad request
    expect(res.text).toEqual("please enter all required fields");
  });
  it("returns good request when correct payload", async () => {
    const res = await request(app).post("/users/register").send({
      username: "test name",
      email: "user@example.com",
      password: "password123",
    });
    console.log(res.body);

    expect(res.statusCode).toEqual(201);
  });
});
