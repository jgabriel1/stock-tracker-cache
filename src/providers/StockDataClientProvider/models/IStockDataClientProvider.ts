import IStockInfoDTO from '../../../dtos/IStockInfoDTO';
import IStockQueryAnswerDTO from '../../../dtos/IStockQueryAnswerDTO';
import IStockChartDataDTO from '../../../dtos/IStockChartDataDTO';
import IFetchChartDataOptions from './IFetchChartDataOptions';

export default interface IStockDataClientProvider {
  fetchStockInfo(tickers: string[]): Promise<IStockInfoDTO[]>;
  fetchQueryAnswers(
    query: string,
    numAnswers?: number,
  ): Promise<IStockQueryAnswerDTO[]>;
  fetchChartData(
    ticker: string,
    { range, numberOfPoints }: IFetchChartDataOptions,
  ): Promise<IStockChartDataDTO>;
}
