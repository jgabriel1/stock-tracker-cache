import FakeStockDataClient from '../providers/StockDataClientProvider/fakes/FakeStockDataProvider';
import FakeStockDataCache from '../providers/CacheProvider/fakes/FakeCacheProvider';

import StockSearchService from './StockSearchService';

describe('StockSearch', () => {
  it('should be able to fetch up to 5 answers for a given query', async () => {
    const fakeDataClient = new FakeStockDataClient();
    const fakeCache = new FakeStockDataCache();

    const stockSearch = new StockSearchService({
      stockDataCache: fakeCache,
      stockDataClient: fakeDataClient,
    });

    const response = await stockSearch.execute({ query: 'test' });

    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeLessThanOrEqual(5);

    const item = response[0];

    expect(item).toHaveProperty('exchange');
    expect(item).toHaveProperty('symbol');
    expect(item).toHaveProperty('longname');
    expect(item).toHaveProperty('typeDisp');
  });
});
