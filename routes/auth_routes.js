// import different route controllers
const Authentication = require('../controllers/authentication');
const passportHandler = require('../services/passport');
const passport = require('passport');
const express = require('express');
// user router to handle moduler app routing
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// any route that requires auth will pass through this function using jwt strategy
// session false indicates that we aren't using cookies
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, function(req, res) {
  res.send({ hi: 'there' });
})
router.post('/register', Authentication.register);
router.post('/signin', requireSignin, Authentication.signin);

module.exports = router;