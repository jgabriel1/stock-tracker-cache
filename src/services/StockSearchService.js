class StockSearchService {
  constructor({ stockDataClient, stockDataCache }) {
    this.client = stockDataClient
    this.cache = stockDataCache
  }

  async execute({ query }) {
    const cachedData = await this.cache.get(`query:${query}`)

    if (cachedData) {
      return cachedData
    }

    const requestData = await this.client.fetchQueryAnswers(query)

    this.cache.set(`query:${query}`, requestData)

    return requestData
  }
}

module.exports = StockSearchService
