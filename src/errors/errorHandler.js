const HTTPException = require('./HTTPException')

function errorHandler(error, request, response, _) {
  if (error instanceof HTTPException) {
    return response.status(error.statusCode).json({
      error: { message: error.message },
    })
  }

  console.error(error)

  return response.status(500).json({
    error: { message: 'An unexpected error ocurred.' },
  })
}

module.exports = errorHandler
