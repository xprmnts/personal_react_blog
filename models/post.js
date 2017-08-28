const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
  content: {
    type: String,
    required: [true, 'require title']
  },
  uri: {
    type: String,
    required: [true, 'require uri']
  },
  slug: String,
});

// Create the model class
const PostModelClass = mongoose.model('post', postSchema);

// Export the user model
module.exports = PostModelClass;