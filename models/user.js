// Moongose ORM/ODM abstracts many of the functions 
// we need to interface with the database
const mongoose = require('mongoose');

// the Schema property helps us map a schema to a mongodb collection
const Schema = mongoose.Schema;

// bcyrpt is an encryption module used to hash user passwords
const bcrypt = require('bcrypt-nodejs');

// Define the user model
// we'll use username, password, name & admin
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true},
  password: String,
  admin: Boolean
});

// On save hook, encrypt Password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // context of the user is the user model (the email/password)
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err) }

    // hash (encrypt) out password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// Create the model class
const UserModelClass = mongoose.model('user', userSchema);

// Export the user model
module.exports = UserModelClass;