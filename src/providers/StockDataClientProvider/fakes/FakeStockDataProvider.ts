import IStockChartDataDTO from '../../../dtos/IStockChartDataDTO';
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

  public async fetchChartData(
    ticker: string,
    { numberOfPoints, range: _ } = { range: '1d', numberOfPoints: 20 },
  ): Promise<IStockChartDataDTO> {
    return {
      symbol: ticker,
      timestamp: new Array(numberOfPoints).map(() => Date.now()),
      close: new Array(numberOfPoints).map(() => 123),
    };
  }
}

export default FakeStockDataProvider;
