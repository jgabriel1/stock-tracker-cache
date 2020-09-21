const FakeStockDataClient = require('../client/fakes/FakeStockDataClient')
const FakeStockDataCache = require('../cache/fakes/FakeStockDataCache')

const StockInfoService = require('./StockInfoService')

describe('StockInfo', () => {
  it('should be able to fetch stock data for a list of tickers', async () => {
    const fakeDataClient = new FakeStockDataClient()
    const fakeCache = new FakeStockDataCache()
    const stockInfo = new StockInfoService({
      stockDataCache: fakeCache,
      stockDataClient: fakeDataClient,
    })

    const response = await stockInfo.execute({
      tickers: ['AAPL', 'TSLA'],
    })

    expect(response).toHaveProperty('AAPL')
    expect(response).toHaveProperty('TSLA')
  })
})
