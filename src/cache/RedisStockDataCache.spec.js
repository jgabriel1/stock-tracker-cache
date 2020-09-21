const cacheConnectionFactory = require('./cacheConnectionFactory')
const RedisStockDataCache = require('./RedisStockDataCache')

describe('RedisCache', () => {
  it('should store a value', async () => {
    const cacheConnection = cacheConnectionFactory()
    const cache = new RedisStockDataCache({ cacheConnection })

    await cache.set('AAPL', { test: 'cache' })

    const storedData = await cache.get('AAPL')

    expect(storedData).toHaveProperty('test')
    expect(storedData.test).toBe('cache')
  })

  it('should return null if the cached value expires', async () => {
    const cacheConnection = cacheConnectionFactory()
    const cache = new RedisStockDataCache({ cacheConnection })

    await cache.set('AAPL', { test: 'cache' }, { ttl: 1 })

    await new Promise(resolve => setTimeout(resolve, 1500))

    const timedOutCache = await cache.get('AAPL')

    expect(timedOutCache).toBeNull()
  })
})
