// node doesn't support ES6 import statements...yet
// on the server we'll be using CommonJS syntax to handle modules
const express = require('express');

// initialize an express app object this app object will be used to handle
// incoming network requests
const app = express();


// temporary route to handle get request to the root route
app.get('/', (req, res) => {
  res.send({ hello: 'world!' });
});

const PORT = process.env.PORT || 5000; 
// in order for express to listen you have to call the listen method
app.listen(PORT);
