const container = require('../container')

class StockInfoController {
  async index(request, response) {
    const { tickers } = request.query

    const stockInfo = container.resolve('stockInfo')
    const data = await stockInfo.execute({ tickers: tickers.split(',') })

    return response.json({ data })
  }
}

module.exports = StockInfoController
