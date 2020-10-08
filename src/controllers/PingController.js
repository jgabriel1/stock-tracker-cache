class PingController {
  ping(request, response) {
    return response.status(200).json({ ping: 'pong' })
  }
}

module.exports = PingController
