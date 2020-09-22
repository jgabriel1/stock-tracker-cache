const parseStockInfoResponse = require('./parsers/parseStockInfoResponse')
const parseQueryResponse = require('./parsers/parseQueryResponse')

const HTTPException = require('../errors/HTTPException')

class StockDataClient {
  constructor({ clientInstance }) {
    this.client = clientInstance
  }

  async fetchStockInfo(tickers) {
    if (tickers.length === 0) {
      return []
    }

    const params = {
      symbols: tickers.join(','),
      range: '1d',
      interval: '1d',
    }

    const response = await this.client
      .get('v7/finance/spark', { params })
      .catch(() => {
        throw new HTTPException(
          'Stock data service is currently unavailable.',
          503,
        )
      })

    try {
      const parsed = parseStockInfoResponse(response.data)

      return parsed
    } catch (error) {
      throw new HTTPException('External api response format changed.', 500)
    }
  }

  async fetchQueryAnswers(query, numAnswers = 5) {
    const params = {
      q: query,
      quotesCount: numAnswers,
      newsCount: 0,
      enableFuzzyQuery: false,
      enableEnhancedTrivialQuery: true,
    }

    const response = await this.client
      .get('v1/finance/search', { params })
      .catch(() => {
        throw new HTTPException(
          'Stock data service is currently unavailable.',
          503,
        )
      })

    try {
      const parsed = parseQueryResponse(response.data)

      return parsed
    } catch (error) {
      throw new HTTPException('External api response format changed.', 500)
    }
  }
}

module.exports = StockDataClient
