const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')
// const memoryStore = require('cache-manager-memory-store')

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

    return cache
  }

  testClient.end(false)

  // console.log('Redis cache unavailable. Using memory cache instead.')

  // const cache = cacheManager.caching({
  //   store: memoryStore,
  // })

  return {
    set(...args) {
      return null
    },
    get(...args) {
      return null
    },
  }
}

module.exports = cacheConnectionFactory
