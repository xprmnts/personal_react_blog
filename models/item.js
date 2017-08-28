const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const settings = require('../settings');

const itemSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'require title']
  },
  tags: [],
  published: {
    type: Date,
    required: [true, 'require date published']
  },
  category: {
    type: String,
    enum: settings.categories,
    required: [true, 'require category']
  },
  uri: {
    type: String,
    required: [true, 'require uri']
  },
  slug: String,
  draft: {
    type: Boolean, required: [true, 'require status']
  }
});

// Create the model class
const ItemModelClass = mongoose.model('item', itemSchema);

// Export the user model
module.exports = ItemModelClass;