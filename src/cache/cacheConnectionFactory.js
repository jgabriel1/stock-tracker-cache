const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const config = require('../config')

function cacheConnectionFactory() {
  const cacheEnabled = config.cache.USE_CACHE

  if (!cacheEnabled) {
    console.log('Cache is disabled.')

    return {
      get: (...args) => null,
      set: (...args) => null,
    }
  }

  const store = redisStore.create()

  const cache = cacheManager.caching({
    store,
    url:
      process.env.REDIS_URL ||
      `redis://127.0.0.1:${config.cache.PORT}/${config.cache.DB}`,
  })

  console.log('Cache is enabled.')

  return cache
}

module.exports = cacheConnectionFactory
