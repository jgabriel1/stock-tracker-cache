const RedisStockDataCache = require('./RedisStockDataCache')

describe('RedisCache', () => {
  it('should store a value', async () => {
    const cache = new RedisStockDataCache()

    await cache.set('AAPL', { test: 'cache' })

    const storedData = await cache.get('AAPL')

    expect(storedData).toHaveProperty('test')
    expect(storedData.test).toBe('cache')
  })

  it('should return null if the cached value expires', async () => {
    const cache = new RedisStockDataCache()

    await cache.set('AAPL', { test: 'cache' }, { ttl: 1 })

    await new Promise(resolve => setTimeout(resolve, 1500))

    const timedOutCache = await cache.get('AAPL')

    expect(timedOutCache).toBeNull()
  })
})
