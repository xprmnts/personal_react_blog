// import different route controllers
const Authentication = require('./controllers/authentication');


module.exports = function(app){
  app.post('/register', Authentication.register);
}
