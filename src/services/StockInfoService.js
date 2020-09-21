class StockInfoService {
  constructor(client, cache) {
    this.client = client
    this.cache = cache
  }

  async execute({ tickers }) {
    // 1 - Iterate through tickers checking it data for any of them is available in
    // cache. The tickers that are not available will be put in a separate array.
    const results = {}
    const unavailable = []

    tickers.forEach(ticker => {
      const cachedResponse = this.cache.get(ticker)

      if (cachedResponse) {
        Object.assign(results, { [ticker]: cachedResponse })
      } else {
        unavailable.push(ticker)
      }
    })

    // 2 - Send the array with unavailable data to the client to make the request.
    const remainingStockInfos = await this.client.fetchStockInfo(unavailable)

    remainingStockInfos.forEach(info => {
      Object.assign(results, { [info.symbol]: info })
    })
    // 3 - store the new responses in the cache
    Promise.allSettled(
      remainingStockInfos.map(info => this.cache.set(info.symbol, info)),
    ).catch(console.log)

    return results
  }
}

module.exports = StockInfoService
