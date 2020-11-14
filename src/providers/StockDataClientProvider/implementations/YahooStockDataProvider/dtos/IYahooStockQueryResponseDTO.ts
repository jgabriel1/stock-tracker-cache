export default interface IYahooStockQueryResponseDTO {
  quotes: Array<{
    exchange: string;
    symbol: string;
    longname?: string;
    typeDisp?: string;
  }>;
}
