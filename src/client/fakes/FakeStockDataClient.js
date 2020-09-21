class FakeStockDataClient {
  async fetchStockInfo(tickers) {
    return tickers.map(ticker => ({
      symbol: ticker,
      currency: 'BRL',
      regularMarketPrice: 123,
      chartPreviousClose: 456,
    }))
  }

  async fetchQueryAnswers(query, numAnswers = 5) {
    const answers = []

    while (answers.length < numAnswers)
      answers.push({
        exchange: 'Fake',
        symbol: 'TST.SA',
        longname: 'Test Company Inc.',
        typeDisp: 'No idea',
      })

    return answers
  }
}

module.exports = FakeStockDataClient
