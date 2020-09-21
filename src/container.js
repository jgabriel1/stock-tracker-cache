const { createContainer, asFunction, Lifetime, asClass } = require('awilix')

const cacheConnectionFactory = require('./cache/cacheConnectionFactory')
const RedisStockDataCache = require('./cache/RedisStockDataCache')

const clientInstanceFactory = require('./client/clientInstanceFactory')
const StockDataClient = require('./client/StockDataClient')

const { StockInfoService, StockSearchService } = require('./services')

const container = createContainer()

container.register({
  // Cache
  cacheConnection: asFunction(cacheConnectionFactory, {
    lifetime: Lifetime.SINGLETON,
  }),
  stockDataCache: asClass(RedisStockDataCache),

  // Client
  clientInstance: asFunction(clientInstanceFactory, {
    lifetime: Lifetime.SINGLETON,
  }),
  stockDataClient: asClass(StockDataClient),

  // Services
  stockInfo: asClass(StockInfoService),
  stockSearch: asClass(StockSearchService),
})

module.exports = container
