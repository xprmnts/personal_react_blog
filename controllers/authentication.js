const User = require('../models/user');
const config = require('../keys/config');

exports.register = (req, res, next) => {
  // read registration request
  const username = req.body.username;
  const password = req.body.password;
  const passphrase = req.body.passphrase;

  if (!username || !password || !passphrase || !name || !email) {
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
    // respond to request 
  res.send({ succes: true });
  });

    
  
}