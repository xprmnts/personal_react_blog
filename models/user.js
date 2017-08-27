// Moongose ORM/ODM abstracts many of the functions 
// we need to interface with the database
const mongoose = require('mongoose');

// the Schema property helps us map a schema to a mongodb collection
const Schema = mongoose.Schema;

// Define the user model
// we'll use username, password, name & admin
const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true},
  password: String,
  admin: Boolean
});

// Create the model class
const UserModelClass = mongoose.model('user', userSchema);

// Export the user model
module.exports = UserModelClass;