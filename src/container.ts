import { createContainer, Lifetime, asClass } from 'awilix';

import CacheProvider from './providers/CacheProvider';
import ICacheProvider from './providers/CacheProvider/models/ICacheProvider';

import StockDataClientProvider from './providers/StockDataClientProvider';
import IStockDataClientProvider from './providers/StockDataClientProvider/models/IStockDataClientProvider';

import StockInfoService from './services/StockInfoService';
import StockSearchService from './services/StockSearchService';
import StockChartDataService from './services/StockChartDataService';

const container = createContainer();

container.register({
  // Cache
  stockDataCache: asClass<ICacheProvider>(CacheProvider, {
    lifetime: Lifetime.SINGLETON,
  }),

  // Client
  stockDataClient: asClass<IStockDataClientProvider>(StockDataClientProvider, {
    lifetime: Lifetime.SINGLETON,
  }),

  // Services
  stockInfo: asClass(StockInfoService),
  stockSearch: asClass(StockSearchService),
  stockChartData: asClass(StockChartDataService),
});

export default container;
