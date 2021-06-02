const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware')

const User = require('./users-model')
const Post = require('../posts/posts-model')

const router = express.Router();

router.get('/', logger, (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  res.status(200).json(req.user)
  // this needs a middleware to verify user id
});

router.post('/', logger, validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  User.insert(req.user)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(next)
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.user)
  .then(user => {
    User.getById(req.params.id)
    .then(updatedUser => {
      res.status(201).json(updatedUser)
    })
    .catch(next)
  })
  .catch(next)
});

router.delete('/:id', logger, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
  .then(user => {
    res.status(200).json(req.user)
  })
  .catch(next)
});

router.get('/:id/posts', logger, validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.user.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(next)
});

router.post('/:id/posts', logger, validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Post.insert(req.post)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(next)
});

// do not forget to export the router
module.exports = router
