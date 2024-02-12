const router = require('express').Router()
const { Token } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  await Token.destroy({
    where: {
      username: req.decodedToken.username
    },
  })

  res.status(204).end()
})

module.exports = router
