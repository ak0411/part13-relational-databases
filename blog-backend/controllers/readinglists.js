const router = require('express').Router()

const { UserBlogs } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const user_blog = await UserBlogs.create(req.body)
  res.json(user_blog)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const user_blog = await UserBlogs.findByPk(req.params.id)

  console.log('decoded id:' + req.decodedToken.id)
  console.log('user_blog userId:' + user_blog.userId)
  if (req.decodedToken.id !== user_blog.userId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  user_blog.isRead = req.body.isRead
  await user_blog.save()
  res.json(user_blog)
})

module.exports = router