const axios = require('axios')
const config = require('../config')
const parseStockInfoResponse = require('./parsers/parseStockInfoResponse')

class StockDataClient {
  constructor() {
    this.client = axios.create({
      baseURL: config.BASE_URL,
    })
  }

  async fetchStockInfo(tickers) {
    const params = {
      symbols: tickers.join(','),
      range: '1d',
      interval: '1d',
    }

    const response = await this.client.get('v7/finance/spark', { params })

    const parsed = parseStockInfoResponse(response.data)

    console.log(parsed)
  }
}

module.exports = StockDataClient
