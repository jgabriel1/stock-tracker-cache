import IStockInfoDTO from '../../../dtos/IStockInfoDTO';
import IStockQueryAnswerDTO from '../../../dtos/IStockQueryAnswerDTO';

export default interface IStockDataClientProvider {
  fetchStockInfo(tickers: string[]): Promise<IStockInfoDTO[]>;
  fetchQueryAnswers(
    query: string,
    numAnswers?: number,
  ): Promise<IStockQueryAnswerDTO[]>;
}
