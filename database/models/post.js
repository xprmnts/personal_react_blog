const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const settings = require("../../keys/settings");

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "require title"]
  },
  tags: [],
  createdOn: {
    type: Date,
    required: [true, "created date is required"]
  },
  publishedOn: {
    type: Date,
    default: null
  },
  category: {
    type: String,
    enum: settings.categories,
    required: [true, "require category"]
  },
  slug: {
    type: String,
    default: null
  },
  draft: {
    type: Boolean,
    default: true
  },
  content: String
});

const Post = mongoose.model("post", PostSchema);

// Export the user model
module.exports = Post;
