export default interface IYahooStockInfoResponseDTO {
  spark: {
    result: Array<{
      response: [
        {
          meta: {
            symbol: string;
            currency: string;
            regularMarketPrice: number;
            chartPreviousClose: number;
          };
          timestamp: number[];
          indicators: {
            quote: [
              {
                close: number[];
              },
            ];
          };
        },
      ];
    }>;
  };
}
