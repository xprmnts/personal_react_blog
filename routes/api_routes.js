// import different route controllers
const PostOps = require("../database/queries/queries");
// TODO: import express/router
const express = require("express");
// user router to handle moduler app routing
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});
// getting all posts
router.get("/post", PostOps.search);

// getting all posts
router.get("/post/:id", PostOps.getOne);

// route handler for post creation
router.post("/post", PostOps.create);

// route handler for post updates
router.put("/post/:id", PostOps.update);

// route handler for post deletions
router.delete("/post/:id", PostOps.delete);

module.exports = router;
