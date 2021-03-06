import IStockInfoDTO from '../dtos/IStockInfoDTO';
import ICacheProvider from '../providers/CacheProvider/models/ICacheProvider';
import IStockDataClientProvider from '../providers/StockDataClientProvider/models/IStockDataClientProvider';

interface IStockInfoServiceDependencies {
  stockDataClient: IStockDataClientProvider;
  stockDataCache: ICacheProvider;
}

interface IRequest {
  tickers: string[];
}

interface IResponse {
  [ticker: string]: IStockInfoDTO;
}

class StockInfoService {
  private client: IStockDataClientProvider;

  private cache: ICacheProvider;

  constructor({
    stockDataClient,
    stockDataCache,
  }: IStockInfoServiceDependencies) {
    this.client = stockDataClient;
    this.cache = stockDataCache;
  }

  public async execute({ tickers }: IRequest): Promise<IResponse> {
    const results = new Map<string, IStockInfoDTO>();
    const unavailableTickers: string[] = [];

    // 1 - Check the cache for any stored values for the requested tickers
    const storedStocksInfo = await this.cache.getMany<IStockInfoDTO>(
      tickers.map(ticker => `info:${ticker}`),
    );

    tickers.forEach(ticker => {
      const storedData = storedStocksInfo.get(`info:${ticker}`);

      if (!storedData) {
        unavailableTickers.push(ticker);
      } else {
        results.set(ticker, storedData);
      }
    });

    // 2 - Send the array with unavailable data to the client to make the request.
    const fetchedStockInfos = await this.client.fetchStockInfo(
      unavailableTickers,
    );

    fetchedStockInfos.forEach(info => {
      results.set(info.symbol, info);
    });

    // 3 - store the new responses in the cache
    Promise.allSettled(
      fetchedStockInfos.map(info =>
        this.cache.set(`info:${info.symbol}`, info),
      ),
    ).catch(console.log);

    return Object.fromEntries(results);
  }
}

export default StockInfoService;
