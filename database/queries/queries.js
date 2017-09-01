/* There are two major usecases to query the databse:
** 1) To render the visitor viewspace
** 2) To render the admin workspace
** This document contains queries pertaining to both.
** ----------------------------------------------------------------------------
*/
const Post = require("../models/post");
const helper = require("./query_builder");

/******************************************************************************
** ---------------------COMMONN VISITOR & ADMIN QUERIES------------------------
******************************************************************************/

/*************************RENDERING A LIST OF POSTS***************************/

// Handles requests of type GET /api/post & GET /api/post?tag=""cat=""
// Returns array of post items containing:
// title, tags, createdOn, publishedOn, category, slug, draft
// This query uses buildQuery helper function to resolve the query restrictions
exports.search = (req, res, next) => {
  Post.find(helper.build(req.query), {
    title: 1,
    tags: 1,
    createdOn: 1,
    publishedOn: 1,
    category: 1,
    slug: 1,
    draft: 1
  })
    .sort({ createdOn: 1 })
    .then(results => {
      res.send(results);
    })
    .catch(err => {
      next(err);
    });
};

/*************************VIEWING A SIGNLE POST*******************************/

// This query handles GET/api/post/slug type requests
// Returns one post, everything except the raw editable data
// TODO: Ensure request fails if post is in draft mode
exports.getViewablePost = (req, res, next) => {
  const { slug } = req.params;

  Post.findOne(
    { slug: slug },
    {
      title: 1,
      tags: 1,
      createdOn: 1,
      publishedOn: 1,
      category: 1,
      slug: 1,
      draft: 1,
      html: 1,
      toc: 1
    }
  )
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      next(err);
    });
};

/******************************************************************************
** --------------------------ADMIN WORKSPACE QUERIES---------------------------
******************************************************************************/

/*************************EDITING A SIGNLE POST*******************************/

// This query handles GET/api/post/slug type requests
// Returns one post, everything except the raw editable data
// TODO: Ensure request fails if post is in draft mode
exports.getEditablePost = (req, res, next) => {
  const { id } = req.params;

  Post.findOne(
    { _id: id },
    {
      title: 1,
      tags: 1,
      createdOn: 1,
      publishedOn: 1,
      category: 1,
      slug: 1,
      draft: 1,
      raw: 1
    }
  )
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      next(err);
    });
};

/*************************PREVIEWING A SIGNLE POST****************************/

// This query handles GET/api/post/id type requests
// Returns one post, everything except the raw editable data/
// TODO: Ensure succesful retrieval only for admins should (i.e. authenticated)
exports.getPostPreview = (req, res, next) => {
  const { id } = req.params;

  Post.findOne(
    { _id: id },
    {
      title: 1,
      tags: 1,
      createdOn: 1,
      publishedOn: 1,
      category: 1,
      slug: 1,
      draft: 1,
      html: 1,
      toc: 1
    }
  )
    .then(post => {
      res.send(post);
    })
    .catch(err => {
      next(err);
    });
};

/****************************CREATING A NEW POST******************************/
// Handles POST /api/post requests with NO body, returns post
// The only value that needs to be set on creation is the createdOn date
// Everything else can get updated later

exports.create = (req, res, next) => {
  // set created date
  const createdOn = Date.now();

  // if all is well create an item
  const post = new Post({ createdOn: createdOn });

  // commit user to database
  post
    .save()
    .then(() => res.send(post))
    .catch(err => {
      next(err);
    });
};

/****************************UPDATING/SAVING A POST******************************/
// Handles PUT /api/post/:id for saving, updating and publishing a post - returns
// success message

exports.update = (req, res, next) => {
  // get post id
  const postId = req.params.id;
  // get request.body
  const postProps = req.body;

  // convert tags to array
  postProps.tags = postProps.tags ? req.body.tags.split(",") : [];
  // set published date if needed
  postProps.publishedOn = postProps.draft ? null : Date.now();

  // find by Id and Update Post
  Post.findByIdAndUpdate({ _id: postId }, postProps)
    .then(() => Post.findById({ _id: postId }))
    .then(post => res.send({ message: "success" }))
    .catch(next);
};

/********************************DELETING A POST**********************************/
// Handles DELETE /api/post/:id requests returns 204 status and the null post?

exports.delete = (req, res, next) => {
  // get post id
  const postId = req.params.id;

  // find by Id and Delete Post
  Post.findByIdAndRemove({ _id: postId })
    .then(post => res.status(204).send(post))
    .catch(next);
};
