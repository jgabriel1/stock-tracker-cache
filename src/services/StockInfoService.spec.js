import FakeStockDataClient from '../providers/StockDataClientProvider/fakes/FakeStockDataProvider';
import FakeStockDataCache from '../providers/CacheProvider/fakes/FakeCacheProvider';

import StockInfoService from './StockInfoService';

describe('StockInfo', () => {
  it('should be able to fetch stock data for a list of tickers', async () => {
    const fakeDataClient = new FakeStockDataClient();
    const fakeCache = new FakeStockDataCache();
    const stockInfo = new StockInfoService({
      stockDataCache: fakeCache,
      stockDataClient: fakeDataClient,
    });

    const response = await stockInfo.execute({
      tickers: ['AAPL', 'TSLA'],
    });

    expect(response).toHaveProperty('AAPL');
    expect(response).toHaveProperty('TSLA');
  });
});
