const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index");

const Post = mongoose.model("post");

describe("Post Search Operations", () => {
  /* Retrieve all posts
  ** 
  */
  it("Get to /api/post to get all posts", done => {
    const post1 = new Post({
      title: "Example Post One",
      tags: ["tag1", "tag2", "tag3"],
      category: "notes",
      createdOn: "2017-08-29 17:07:56.388Z",
      draft: true,
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });
    const post2 = new Post({
      title: "Example Post Two",
      tags: ["tag4", "tag5", "tag6"],
      category: "apps",
      createdOn: "2017-08-29 17:07:56.388Z",
      draft: false,
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });

    Promise.all([post1.save(), post2.save()]).then(() => {
      request(app).get("/api/post").expect(200).then(response => {
        assert(response.body.length === 2);
        done();
      });
    });
  });

  /* Retrieve posts by tag
  ** 
  */
  it("Get to /api/post to get posts by tag", done => {
    const post1 = new Post({
      title: "Example Post One",
      tags: ["tag1", "tag2", "tag3"],
      category: "notes",
      createdOn: "2017-08-29 17:07:56.388Z",
      draft: true,
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });
    const post2 = new Post({
      title: "Example Post Two",
      tags: ["tag4", "tag5", "tag6"],
      category: "apps",
      createdOn: "2017-08-29 17:07:56.388Z",
      draft: false,
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });

    Promise.all([post1.save(), post2.save()]).then(() => {
      request(app).get("/api/post/?tag=tag6").expect(200).then(response => {
        assert(response.body.length === 1);
        assert(response.body[0].tags.includes("tag6"));
        done();
      });
    });
  });

  /* Retrieve posts by category
  ** 
  */
  it("Get to /api/post to get posts by category", done => {
    const post1 = new Post({
      title: "Example Post One",
      tags: ["tag1", "tag2", "tag3"],
      category: "notes",
      createdOn: "2017-08-29 17:07:56.388Z",
      draft: true,
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });
    const post2 = new Post({
      title: "Example Post Two",
      tags: ["tag4", "tag5", "tag6"],
      category: "apps",
      createdOn: "2017-08-29 17:07:56.388Z",
      draft: false,
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });

    Promise.all([post1.save(), post2.save()]).then(() => {
      request(app)
        .get("/api/post/?category=notes")
        .expect(200)
        .then(response => {
          assert(response.body.length === 1);
          assert(response.body[0].category == "notes");
          done();
        });
    });
  });
});
