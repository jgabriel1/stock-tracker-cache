const config = require('../config')

class RedisStockDataCache {
  constructor({ cacheConnection }) {
    this.cache = cacheConnection
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
