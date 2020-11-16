import IStockQueryAnswerDTO from '../../../../../dtos/IStockQueryAnswerDTO';
import IYahooStockQueryResponseDTO from '../dtos/IYahooStockQueryResponseDTO';

export default function parseQueryResponse(
  responseData: IYahooStockQueryResponseDTO,
): IStockQueryAnswerDTO[] {
  return responseData.quotes.map(result => {
    return {
      symbol: result.symbol,
      exchange: result.exchange,
      longname: result?.longname || result.symbol,
      typeDisp: result?.typeDisp,
    };
  });
}
