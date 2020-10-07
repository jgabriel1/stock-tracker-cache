const container = require('../container')

class StockSearchController {
  async index(request, response) {
    const { query } = request.query

    const stockSearch = container.resolve('stockSearch')

    const data = await stockSearch.execute({ query })

    return response.json({ data })
  }
}

module.exports = StockSearchController
