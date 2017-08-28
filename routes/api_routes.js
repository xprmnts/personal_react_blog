// import different route controllers
const Submission = require('../controllers/submission');
// TODO: import express/router
const express = require('express');
// user router to handle moduler app routing
const router = express.Router();


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// TODO: create route to get items by /tag/category/nothing

// TODO: create route to get post by uri/slug

// TODO: create route to create posts
router.post('/post', Submission.submitItem);

module.exports = router;

// TODO: create route to update posts

// TODO: create route to delete posts

