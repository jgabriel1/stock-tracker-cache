import IStockInfoDTO from '../../../dtos/IStockInfoDTO';
import IStockQueryAnswerDTO from '../../../dtos/IStockQueryAnswerDTO';
import IStockDataClientProvider from '../models/IStockDataClientProvider';

class FakeStockDataProvider implements IStockDataClientProvider {
  public async fetchStockInfo(tickers: string[]): Promise<IStockInfoDTO[]> {
    return tickers.map(ticker => ({
      symbol: ticker,
      currency: 'BRL',
      regularMarketPrice: 123,
      chartPreviousClose: 456,
    }));
  }

  public async fetchQueryAnswers(
    query: string,
    numAnswers = 5,
  ): Promise<IStockQueryAnswerDTO[]> {
    const answers = [];

    while (answers.length < numAnswers)
      answers.push({
        exchange: 'Fake',
        symbol: 'TST.SA',
        longname: 'Test Company Inc.',
        typeDisp: 'No idea',
      });

    return answers;
  }
}

export default FakeStockDataProvider;
