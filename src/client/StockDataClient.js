const parseStockInfoResponse = require('./parsers/parseStockInfoResponse')
const parseQueryResponse = require('./parsers/parseQueryResponse')

class StockDataClient {
  constructor({ clientInstance }) {
    this.client = clientInstance
  }

  async fetchStockInfo(tickers) {
    const params = {
      symbols: tickers.join(','),
      range: '1d',
      interval: '1d',
    }

    const response = await this.client.get('v7/finance/spark', { params })

    const parsed = parseStockInfoResponse(response.data)

    return parsed
  }

  async fetchQueryAnswers(query, numAnswers = 5) {
    const params = {
      q: query,
      quotesCount: numAnswers,
      newsCount: 0,
      enableFuzzyQuery: false,
      enableEnhancedTrivialQuery: true,
    }

    const response = await this.client.get('v1/finance/search', { params })

    const parsed = parseQueryResponse(response.data)

    return parsed
  }
}

module.exports = StockDataClient
