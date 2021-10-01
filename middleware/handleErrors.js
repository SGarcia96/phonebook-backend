module.exports = (error, request, response, next) => {
  console.error(error.name)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'id used is malformed' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
