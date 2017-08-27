const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../keys/config');

// generate jwt token (payload)
function tokenizer(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat:timestamp }, config.jwtSecret);
}

//

exports.signin = function(req, res, next) {
  // on succesful done callback from passport, it supplies req.user
  res.send({ token: tokenizer(req.user) });
  
  // user is already authorized
  // give token

}

exports.register = (req, res, next) => {
  // read registration request
  const username = req.body.username;
  const password = req.body.password;
  const passphrase = req.body.passphrase;

  if (!username || !password || !passphrase) {
    return res.status(422).send({ error: 'partial / incomplete form'});
  }

  // check if passphrase is correct
  console.log(passphrase, config.adminKey);
  if (passphrase !== config.adminKey && passphrase !== config.friendKey) {
    //return error
    return res.status(422).send({ error: 'you shall not pass!'});
  }
  
  // validate if user already exists
  // if exists return error
  User.findOne({ username: username }, (err, userExists) => {
    // some db connectivity issue
    if (err) { return next(err); }

    // if username already registered
    if (userExists) {
      return res.status(422).send({ error: 'user already exists'});
    }
  });

  // if all is well create an admin user
  const user = new User({
    username: username,
    password: password,
    admin: (passphrase === config.adminKey ? true : false),
  });

  // commit user to database
  user.save( (err) => {
    // if there was a db op error
    if (err) { return next(err); }

    // respond to request comfing user creation
    res.send({ token: tokenizer(user) });
  });

}