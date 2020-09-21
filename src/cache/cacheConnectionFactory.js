const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const config = require('../config')

function cacheConnectionFactory() {
  const cache = cacheManager.caching({
    store: redisStore,
    db: config.cache.DB,
    port: config.cache.PORT,
  })

  cache.store.events.on('redisError', error => {
    console.log(error)
    throw new Error(error)
  })

  return cache
}

module.exports = cacheConnectionFactory
