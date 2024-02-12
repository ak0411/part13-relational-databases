const { SECRET } = require('./config')
const jwt = require('jsonwebtoken')
const { Token, User } = require('../models')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log('Error Name:' + error.name)
  console.log(error.message)

  switch (error.name) {
    case 'SequelizeForeignKeyConstraintError':
    case 'SequelizeValidationError':
    case 'SequelizeDatabaseError':
    case 'SequelizeUniqueConstraintError':
      response.status(400).json({ error: error.message })
      break
    case 'TypeError':
      response.status(400).json({ error: 'Malformed request' })
      break
    default:
      next(error)
  }
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)

      const existingToken = await Token.findOne({
        where: {
          username: req.decodedToken.username,
        },
      })

      if (!existingToken) {
        return res.status(401).json({ error: 'session invalid' })
      }

      const user = await User.findByPk(req.decodedToken.id)

      if (user.disabled) {
        await Token.destroy({
          where: {
            username: user.username
          },
        })

        return res.status(401).json({
          error: 'account disabled, please contact admin'
        })
      }
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}