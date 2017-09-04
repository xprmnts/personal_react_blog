// node doesn't support ES6 import statements...yet
// on the server we'll be using CommonJS syntax to handle modules
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./keys/config");
const cors = require("cors");
//
const auth_routes = require("./routes/auth_routes");
const api_routes = require("./routes/api_routes");
const root_route = require("./routes/root_route");

//DB Setup
mongoose.connect(config.mongoURI);
// initialize an express app object this app object will be used to handle
// incoming network requests
const app = (module.exports = express());

// express middleware logging framework - logs requests on the server
app.use(morgan("combined"));

// express middle ware to handle cors requests
// TODO: set up restrictions on cors to allow reqs from specific hosts
app.use(cors());

// express middle ware to be parse request body as json
app.use(bodyParser.json({ type: "*/*" }));

// user modular routes to handle different aspects of application
// app.use("/", root_route);
app.use("/auth", auth_routes);
app.use("/api", api_routes);

if (
  process.env.NODE_ENV === "staging" ||
  process.env.NODE_ENV === "production"
) {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8080;
// in order for express to listen you have to call the listen method
app.listen(PORT);
