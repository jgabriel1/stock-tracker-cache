const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const redis = require('redis')

const config = require('../config')

function cacheConnectionFactory() {
  const testClient = redis.createClient({
    db: config.cache.DB,
    port: config.cache.PORT,
  })

  if (testClient.ping()) {
    const cache = cacheManager.caching({
      store: redisStore,
      db: config.cache.DB,
      port: config.cache.PORT,
    })

    console.log('Using Redis Cache.')

    return cache
  }

  testClient.end(false)

  console.log('Cache NOT enabled.')

  return {
    set: (...args) => null,
    get: (...args) => null,
  }
}

module.exports = cacheConnectionFactory
