const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const settings = require("../../keys/settings");

const PostSchema = new Schema({
  title: {
    type: String,
    default: "Untitled"
  },
  tags: [],
  createdOn: {
    type: Date
  },
  publishedOn: {
    type: Date,
    default: null
  },
  category: {
    type: String,
    enum: settings.categories,
    default: "notes"
  },
  slug: {
    type: String,
    default: null
  },
  draft: {
    type: Boolean,
    default: true
  },
  content: {
    type: String,
    default: null
  }
});

const Post = mongoose.model("post", PostSchema);

// Export the user model
module.exports = Post;
