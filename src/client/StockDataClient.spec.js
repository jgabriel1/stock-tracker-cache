const clientInstanceFactory = require('./clientInstanceFactory')
const StockDataClient = require('./StockDataClient')

describe('StockDataClient', () => {
  it('should fetch stock info and parse it to the correct format', async () => {
    const clientInstance = clientInstanceFactory()
    const client = new StockDataClient({ clientInstance })

    const data = await client.fetchStockInfo(['AAPL', 'TSLA'])

    expect(data).toBeInstanceOf(Array)

    const item = data[0]

    expect(item).toHaveProperty('symbol')
    expect(item).toHaveProperty('currency')
    expect(item).toHaveProperty('regularMarketPrice')
    expect(item).toHaveProperty('chartPreviousClose')
  }, 5000)

  it('should fetch stock query data and return in the correct format', async () => {
    const clientInstance = clientInstanceFactory()
    const client = new StockDataClient({ clientInstance })

    const data = await client.fetchQueryAnswers('apple')

    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeLessThanOrEqual(5)

    const item = data[0]

    expect(item).toHaveProperty('exchange')
    expect(item).toHaveProperty('symbol')
    expect(item).toHaveProperty('longname')
    expect(item).toHaveProperty('typeDisp')
  }, 5000)
})
