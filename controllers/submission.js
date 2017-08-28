const Item = require('../models/item');
const Post = require('../models/post');

exports.submitItem = (req, res, next) => {
  // validate Item
  // read registration request
  const title = req.body.title;
  const tags = req.body.tags.split(',');
  const category = req.body.category;
  const draft = req.body.draft;
  if(!draft){ const slug = req.body.slug; }
  
  // generate uri
  const uri = makeURI();

  // slug if not draft
  
  // if all is well create an item
  const item = new Item({
    title: title,
    tags: tags,
    published: Date.now(),
    category: category,
    uri: uri,
    slug: !draft ? slug : null,
    draft: draft
  });

  // commit user to database
  item.save( (err) => {
    // if there was a db op error
    if (err) { return next(err); }
    // respond to request comfing user creation
    res.send(item);
  });


};

const makeURI = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}