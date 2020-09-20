function parseStockInfoResponse(responseData) {
  const results = responseData.spark.result

  return results.map(result => {
    const data = result.response[0].meta

    return {
      symbol: data.symbol,
      currency: data.currency,
      regularMarketPrice: data.regularMarketPrice,
      chartPreviousClose: data.chartPreviousClose,
    }
  })
}

module.exports = parseStockInfoResponse
