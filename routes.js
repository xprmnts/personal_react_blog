// import different route controllers
const Authentication = require('./controllers/authentication');
const passportHandler = require('./services/passport');
const passport = require('passport');

// any route that requires auth will pass through this function using jwt strategy
// session false indicates that we aren't using cookies
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  })
  app.post('/register', Authentication.register);
  app.post('/signin', requireSignin, Authentication.signin);
}
