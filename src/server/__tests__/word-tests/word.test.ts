import request from "supertest";
import app from "../../app";
import moxios from "moxios";
const dictUrl = process.env.DICT_URL;
const rhymeUrl = process.env.RHYME_URL;

describe("GET /word/:word/*", () => {
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
  it("return a synonym", async () => {
    moxios.stubRequest(/api.dictionaryapi.dev/, {
      status: 200,
    });
    await request(app).get("/word/tree/synonym");

    expect(moxios.requests.mostRecent().url).toBe(dictUrl + "tree");
  });
  it("return a antonym", async () => {
    moxios.stubRequest(/api.dictionaryapi.dev/, {
      status: 200,
    });
    await request(app).get("/word/tree/antonym");

    expect(moxios.requests.mostRecent().url).toBe(dictUrl + "tree");
  });
  it("return a antonym", async () => {
    moxios.stubRequest(/rhymebrain.com/, {
      status: 200,
    });
    await request(app).get("/word/tree/rhyme");

    expect(moxios.requests.mostRecent().url).toBe(rhymeUrl + "tree");
  });
});
