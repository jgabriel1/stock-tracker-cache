import IStockChartDataDTO from '../../../../../dtos/IStockChartDataDTO';
import IYahooStockInfoResponseDTO from '../dtos/IYahooStockInfoResponseDTO';

export default function parseChartDataResponse(
  responseData: IYahooStockInfoResponseDTO,
): IStockChartDataDTO {
  const [result] = responseData.spark.result;

  const { meta, timestamp, indicators } = result.response[0];
  const { close } = indicators.quote[0];

  return {
    symbol: meta.symbol,
    timestamp,
    close,
  };
}
