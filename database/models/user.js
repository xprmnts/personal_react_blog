/* The USER COLLECTION
** For the immediate purpose there is little justification for creating
** this collection b/c this will be a single user application and I could
** have just stored the password in a server env variable. But having
** this collection makes it easy to manage password updates, and migration
** in the future...or so I believe at the moment.
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// bcyrpt is an encryption module used to hash user passwords
const bcrypt = require("bcrypt-nodejs");
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
  email: { type: String, unique: true, lowercase: true },
  admin: Boolean
});

// On save hook, encrypt Password
// Before saving a model, run this function
userSchema.pre("save", function(next) {
  // context of the user is the user model (the email/password)
  const user = this;

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    // hash (encrypt) out password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

// helper method to compare passwords
userSchema.methods.comparePassword = function(passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create the model class
const UserModelClass = mongoose.model("user", userSchema);

// Export the user model
module.exports = UserModelClass;
