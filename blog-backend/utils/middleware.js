const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'TypeError') {
    return response.status(404).json({ error: 'blog not found' })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}