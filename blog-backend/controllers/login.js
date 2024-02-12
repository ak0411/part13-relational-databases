const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Token } = require('../models')

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({
    where: {
      username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const existingToken = await Token.findOne({
    where: {
      username: user.username,
    },
  })

  if (user.disabled) {
    if (existingToken) {
      await Token.destroy({
        where: {
          username: user.username
        },
      })
    }
    return response.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  if (existingToken) {
    return response.status(409).json({
      error: 'Session already exists for this user',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await Token.create({
    username: user.username,
    token,
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router