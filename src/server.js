const express = require('express')
const StockDataClient = require('./client/StockDataClient')

const app = express()

app.get('/info', async (request, response) => {
  const { tickers } = request.query

  const client = new StockDataClient()

  const data = await client.fetchStockInfo(tickers.split(','))

  return response.json({ data })
})

app.get('/search', async (request, response) => {
  const { query } = request.query

  const client = new StockDataClient()

  const data = await client.fetchQueryAnswers(query)

  return response.json({ data })
})

app.listen(3334, () => {
  console.log('Server started on port 3334!')
})
