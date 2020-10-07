const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const config = require('../config')

function cacheConnectionFactory() {
  const store = redisStore.create()

  const cache = cacheManager.caching({
    store,
    db: config.cache.DB,
    port: config.cache.PORT,
  })

  return cache
}

module.exports = cacheConnectionFactory
