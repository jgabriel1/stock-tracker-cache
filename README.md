# Chart data possibilities

## Query params

### `range`

Number of days for the total chart length. E.G. '1d' means the chart data for the
last day.

The regular values that appear in most charts are: 1d, 5d, 1m, 6m, 1y, 5y

The available values exposed by Yahoo are: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y,
ytd, max

### `numberOfPoints`

Conveniently controls the number of points in the chart.

One important thing to keep in mind is that, since it's a mobile app, the user won't
really be able to hover over and try to see a specific point. Because of that, this
comes in handy because it allows you to fetch less data and still show the real data
without doing any weird processing in the app itself.

My guess is around 20 to 50 points would look good for the app just to catch the
tendency lines and see if it's going up or down.

### `interval`

This is the third part of the ratio. It's basically the two above's ratio. In my
opinion, `numberOfPoints` is more useful than this.

## Example response:

GET https://query1.finance.yahoo.com/v7/finance/spark
QUERY:
symbols: TSLA,AAPL
range: 1d
numberOfPoints: 10

\* Some of the points judged useless were removed.

```json
{
  "spark": {
    "result": [
      {
        "symbol": "AAPL",
        "response": [
          {
            "meta": {
              "currency": "USD",
              "symbol": "AAPL",
              "regularMarketPrice": 118.31,
              "chartPreviousClose": 119.21,
              "previousClose": 119.21,
              "dataGranularity": "39m",
              "range": "1d",
            },
            "timestamp": [
              1605277800,
              1605280140,
              1605282480,
              1605284820,
              1605287160,
              1605289500,
              1605291840,
              1605294180,
              1605295077
            ],
            "indicators": {
              "quote": [
                {
                  "close": [
                    118.271,
                    118.29,
                    118.34,
                    118.775,
                    118.825,
                    119.145,
                    118.675,
                    118.241,
                    118.31
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        "symbol": "TSLA",
        "response": [
          {
            "meta": {
              "currency": "USD",
              "symbol": "TSLA",
              "regularMarketPrice": 402.42,
              "chartPreviousClose": 411.76,
              "previousClose": 411.76,
              "dataGranularity": "39m",
              "range": "1d",
            },
            "timestamp": [
              1605277800,
              1605280140,
              1605282480,
              1605284820,
              1605287160,
              1605289500,
              1605291840,
              1605294180,
              1605295074
            ],
            "indicators": {
              "quote": [
                {
                  "close": [
                    406.242,
                    405.46,
                    406.1,
                    405.437,
                    405.89,
                    403.871,
                    403.173,
                    402.36,
                    402.42
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    "error": null
  }
}
```
