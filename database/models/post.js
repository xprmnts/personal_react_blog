/* The POST COLLECTION
** Stores all post content necessary to list, edit & render a post
** Not sure what the implications of storing large strings in the
** raw & html properties will be on performance - but I decided
** to go with this data structure b/c its simpler to manager and
** work with
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const settings = require("../../keys/settings");

// Store title, tags, createdOn, publishedOn, category, slug, draft, raw, html, toc
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
