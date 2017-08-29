const Post = require("../models/post");

/*
** Takes incoming body and creates new post
*/
exports.submitPost = (req, res, next) => {
  // get request.body
  const postProps = req.body;
  // convert tags to array
  postProps.tags = req.body.tags.split(",");
  // set published date if needed
  postProps.publishedOn = postProps.draft ? null : Date.now();

  // if all is well create an item
  const post = new Post(postProps);

  // commit user to database
  post.save(err => {
    // if there was a db op error
    if (err) {
      return next(err);
    }
    // respond to request comfing user creation
    res.send(post);
  });
};

/*
** Takes incoming body and updates existing post
*/
exports.updatePost = (req, res, next) => {
  // get post id
  const postId = req.params.id;
  // get request.body
  const postProps = req.body;

  // convert tags to array
  postProps.tags = postProps.tags ? req.body.tags.split(",") : pass;
  // set published date if needed
  postProps.publishedOn = postProps.draft ? null : Date.now();

  // find by Id and Update Post
  Post.findByIdAndUpdate({ _id: postId }, postProps)
    .then(() => Post.findById({ _id: id }))
    .then(post => res.send(post))
    .catch(next);
};

/*
** Takes incoming body and updates existing post
*/
exports.deletePost = (req, res, next) => {
  // get post id
  const postId = req.params.id;

  // find by Id and Delete Post
  Post.findByIdAndRemove({ _id: postId })
    .then(post => res.status(204).send(post))
    .catch(next);
};
