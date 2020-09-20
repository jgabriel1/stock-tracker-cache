const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis')

const config = require('../config')

class RedisStockDataCache {
  constructor() {
    this.cache = cacheManager.caching({
      store: redisStore,
      db: config.cache.DB,
      port: config.cache.PORT,
    })

    this.cache.store.events.on('redisError', error => {
      console.log(error)
      throw new Error(error)
    })
  }

  async set(ticker, data, { ttl } = {}) {
    const dataJSON = JSON.stringify(data)

    await this.cache.set(ticker, dataJSON, { ttl: ttl || config.cache.TTL })
  }

  async get(ticker) {
    const data = await this.cache.get(ticker)

    if (data) {
      const parsed = JSON.parse(data)
      return parsed
    }

    return null
  }
}

module.exports = RedisStockDataCache
