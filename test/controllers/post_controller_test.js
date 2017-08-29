const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../index");

const Post = mongoose.model("post");

describe("Post Submit controller", () => {
  /* Creating draft posts
  ** 
  */
  it("Post to /api/post creates a new post", done => {
    Post.count().then(count => {
      request(app)
        .post("/api/post")
        .send({
          title: "Example Post One",
          tags: "tag1, tag2, tag3",
          category: "notes",
          uri: "test",
          draft: true,
          slug: "this-is-my-slug",
          content: "Lorem ipsum dolor"
        })
        .end(() => {
          Post.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  /* Updating draft & publishing
  ** 
  */
  it("Put to /api/post/id can unpublish a record", done => {
    const post = new Post({
      title: "Example Post One",
      tags: "tag1, tag2, tag3",
      category: "notes",
      draft: true,
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });
    post.save().then(() => {
      request(app)
        .put(`/api/post/${post._id}`)
        .send({
          title: "Example Post One",
          tags: "tag1, tag2, tag3",
          category: "notes",
          draft: false,
          slug: "super-awesome-slug",
          content: "Lorem ipsum dolor"
        })
        .end(() => {
          Post.findOne({ _id: post._id }).then(post => {
            assert(post.draft === false);
            assert(post.slug === "super-awesome-slug");
            assert(post.publishedOn !== null);
            done();
          });
        });
    });
  });

  // Removing posts
  /* Deleting a post
  ** 
  */
  it("Delete to /api/post/id can delete a record", done => {
    const post = new Post({
      title: "Example Post One",
      tags: "tag1, tag2, tag3",
      category: "notes",
      draft: true,
      publishedOn: null,
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });
    post.save().then(() => {
      request(app).delete(`/api/post/${post._id}`).end(() => {
        Post.count().then(count => {
          assert(count === 0);
        });
        done();
      });
    });
  });

  /* Unpublishing a post
  ** 
  */
  it("Put to /api/post/id can unpublish a record", done => {
    const post = new Post({
      title: "Example Post One",
      tags: "tag1, tag2, tag3",
      category: "notes",
      draft: false,
      publishedOn: "2017-08-29 17:07:56.388Z",
      slug: "super-awesome-slug",
      content: "Lorem ipsum dolor"
    });
    post.save().then(() => {
      request(app)
        .put(`/api/post/${post._id}`)
        .send({
          title: "Example Post One",
          tags: "tag1, tag2, tag3",
          category: "notes",
          draft: true,
          publishedOn: "2017-08-29 17:07:56.388Z",
          slug: "super-awesome-slug",
          content: "Lorem ipsum dolor"
        })
        .end(() => {
          Post.findOne({ _id: post._id }).then(post => {
            assert(post.draft === true);
            assert(post.slug === "super-awesome-slug");
            assert(post.publishedOn === null);
            done();
          });
        });
    });
  });
  // Publishing posts
});
