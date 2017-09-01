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

/******************************************************************************
** --------------------- VISITOR/COMMON API ROUTES-----------------------------
******************************************************************************/

// get posts for rendering on homepage, category or tag pages + admin dashboard
router.get("/api/post", PostOps.search);

// get a single post for viewing only
router.get("/api/post/:slug", PostOps.getViewablePost);

/******************************************************************************
** --------------------- ADMIN API ROUTES-------------------------------------
******************************************************************************/

/********TODO: ENSURE the below api routes all require authentication ********/

// create a new post
router.post("/api/post", PostOps.create);

// get editable post for loading into admin workspace/editor
router.get("/api/post/:id", PostOps.getEditablePost);

// update a post, save a post or publish a post
router.put("/api/post/:id", PostOps.update);

// delete a post
router.delete("/api/post/:id", PostOps.update);

module.exports = router;
