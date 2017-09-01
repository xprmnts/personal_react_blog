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
    type: String
  },
  draft: {
    type: Boolean,
    default: true
  },
  raw: {
    type: String
  },
  html: {
    type: String
  },
  toc: {
    type: String
  }
});

const Post = mongoose.model("post", PostSchema);

// Export the user model
module.exports = Post;
