const express = require("express");
const router = express.Router();

router.use(function timeLog(req, res, next) {
  next();
});

router.get("/", function(req, res) {
  res.send({ hi: "there" });
});

module.exports = router;
