import IStockQueryAnswerDTO from '../dtos/IStockQueryAnswerDTO';
import ICacheProvider from '../providers/CacheProvider/models/ICacheProvider';
import IStockDataClientProvider from '../providers/StockDataClientProvider/models/IStockDataClientProvider';

interface IStockSearchServiceDependencies {
  stockDataClient: IStockDataClientProvider;
  stockDataCache: ICacheProvider;
}

interface IRequest {
  query: string;
}

type IResponse = IStockQueryAnswerDTO[];

class StockSearchService {
  private client: IStockDataClientProvider;

  private cache: ICacheProvider;

  constructor({
    stockDataClient,
    stockDataCache,
  }: IStockSearchServiceDependencies) {
    this.client = stockDataClient;
    this.cache = stockDataCache;
  }

  public async execute({ query }: IRequest): Promise<IResponse> {
    const cachedData = await this.cache.get<IStockQueryAnswerDTO[]>(
      `query:${query}`,
    );

    if (cachedData) {
      return cachedData;
    }

    const requestData = await this.client.fetchQueryAnswers(query);

    this.cache.set(`query:${query}`, requestData);

    return requestData;
  }
}

export default StockSearchService;
