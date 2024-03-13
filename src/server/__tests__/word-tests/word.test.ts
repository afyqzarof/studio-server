import request from "supertest";
import app from "../../app";
import moxios from "moxios";
const dictUrl = process.env.DICT_URL;

describe("GET /word/:word/definition", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("return a definition", async () => {
    moxios.stubRequest(/api.dictionaryapi.dev/, {
      status: 200,
    });
    await request(app).get("/word/tree/definition");

    expect(moxios.requests.mostRecent().url).toBe(dictUrl + "tree");
  });
});
