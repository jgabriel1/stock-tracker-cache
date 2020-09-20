const parseStockInfoResponse = require('./parseStockInfoResponse')

describe('parseStockInfoResponse', () => {
  it('should parse a raw object into the desired output', () => {
    const output = parseStockInfoResponse({
      spark: {
        result: [
          {
            response: [
              {
                meta: {
                  symbol: 'TEST',
                  currency: 'USD',
                  regularMarketPrice: 123,
                  chartPreviousClose: 456,
                },
              },
            ],
          },
        ],
      },
    })

    expect(output).toBeInstanceOf(Array)

    const item = output[0]

    expect(item).toHaveProperty('symbol')
    expect(item).toHaveProperty('currency')
    expect(item).toHaveProperty('regularMarketPrice')
    expect(item).toHaveProperty('chartPreviousClose')
  })
})
