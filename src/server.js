const express = require('express')
const container = require('./container')

const app = express()

app.get('/info', async (request, response) => {
  const { tickers } = request.query

  const stockInfo = container.resolve('stockInfo')
  const data = await stockInfo.execute({ tickers: tickers.split(',') })

  return response.json({ data })
})

app.get('/search', async (request, response) => {
  const { query } = request.query

  const stockSearch = container.resolve('stockSearch')

  const data = await stockSearch.execute({ query })

  return response.json({ data })
})

app.listen(3334, () => {
  console.log('Server started on port 3334!')
})
