const parseQueryResponse = require('./parseQueryResponse')

describe('parseQueryResponse', () => {
  it('should parse a raw object into the desired output', () => {
    const output = parseQueryResponse({
      quotes: [
        {
          exchange: 'TEST',
          symbol: 'TEST',
          longname: 'Test Inc.',
          typeDisp: 'Equity',
        },
      ],
    })

    expect(output).toBeInstanceOf(Array)

    const item = output[0]

    expect(item).toMatchObject({
      exchange: 'TEST',
      symbol: 'TEST',
      longname: 'Test Inc.',
      typeDisp: 'Equity',
    })
  })
})
