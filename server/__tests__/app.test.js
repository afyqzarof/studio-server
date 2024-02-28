const request = require("supertest");
const app = require("../app");

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
});
