class FakeStockDataCache {
  constructor() {
    this.cache = new Map()
  }

  async set(key, data, { ttl } = {}) {
    const stringifiedData = JSON.stringify(data)

    this.cache.set(key, stringifiedData)

    setTimeout(() => {
      this.cache.delete(key)
    }, ttl || 5000)
  }

  async get(key) {
    const data = this.cache.get(key)

    if (data) {
      return JSON.parse(data)
    }

    return null
  }
}

module.exports = FakeStockDataCache
