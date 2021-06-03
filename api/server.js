require('dotenv').config()
const express = require('express');
const cors = require('cors')
const userRouter = require('./users/users-router')
const { logger } = require('./middleware/middleware')
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
server.use(cors())
server.use(logger)

// global middlewares and the user's router need to be connected here
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: 'something exploded in the app',
    message: err.message,
    stack: err.stack
  })
})

module.exports = server;
