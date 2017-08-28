// node doesn't support ES6 import statements...yet
// on the server we'll be using CommonJS syntax to handle modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./keys/config');

// 
const auth_routes = require('./routes/auth_routes');
const api_routes = require('./routes/api_routes');

//DB Setup
mongoose.connect(config.mongoURI);

// initialize an express app object this app object will be used to handle
// incoming network requests
const app = module.exports = express();

// express middleware logging framework - logs requests on the server
app.use(morgan('combined'))

// express middle ware to be parse request body as json
app.use(bodyParser.json({ type: '*/*' }));

// user modular routes to handle different aspects of application
app.use('/auth', auth_routes);
app.use('/api', api_routes);

const PORT = process.env.PORT || 8080; 
// in order for express to listen you have to call the listen method
app.listen(PORT);
