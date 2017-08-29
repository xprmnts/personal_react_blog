const assert = require("assert");
const request = require("supertest");
const app = require("../index");

describe("the express App", () => {
  xit("handles a request to root route", done => {
    request(app).get("/").end((err, response) => {
      assert(response.body.hi === "there");
      done();
    });
  });
});
