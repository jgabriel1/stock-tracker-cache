const axios = require('axios')

const config = require('../config')

function clientInstanceFactory() {
  const client = axios.create({ baseURL: config.BASE_URL })

  return client
}

module.exports = clientInstanceFactory
