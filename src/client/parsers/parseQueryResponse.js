function parseQueryResponse(responseData) {
  return responseData.quotes.map(result => ({
    exchange: result.exchange,
    symbol: result.symbol,
    longname: result.longname,
    typeDisp: result.typeDisp,
  }))
}

module.exports = parseQueryResponse
