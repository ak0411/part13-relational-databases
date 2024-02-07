const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log('Error Name:' + error.name)
  console.log(error.message)

  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name ===  'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: 'Username must be unique'})
  }

  if (error.name === 'TypeError') {
    return response.status(404).json({ error: 'Resource not found' })
  }

  if (error.name === 'PasswordError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}