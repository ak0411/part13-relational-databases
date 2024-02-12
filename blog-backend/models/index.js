const Blog = require('./blog')
const User = require('./user')
const UserBlogs = require('./user_blogs')
const Token = require('./token')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: UserBlogs, as: 'readings' })
Blog.belongsToMany(User, { through: UserBlogs, as: 'users_reading'})

module.exports = {
  Blog, User, UserBlogs, Token
}