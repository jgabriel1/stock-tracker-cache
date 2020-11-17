import IStockChartDataDTO from '../dtos/IStockChartDataDTO';
import ICacheProvider from '../providers/CacheProvider/models/ICacheProvider';
import IStockDataClientProvider from '../providers/StockDataClientProvider/models/IStockDataClientProvider';

interface IStockChartDataServiceDependencies {
  stockDataClient: IStockDataClientProvider;
  stockDataCache: ICacheProvider;
}

interface IRequest {
  ticker: string;
  range: string;
  numberOfPoints: number;
}

type IResponse = IStockChartDataDTO;

class StockChartDataService {
  private client: IStockDataClientProvider;

  private cache: ICacheProvider;

  constructor({
    stockDataClient,
    stockDataCache,
  }: IStockChartDataServiceDependencies) {
    this.client = stockDataClient;
    this.cache = stockDataCache;
  }

  public async execute({
    ticker,
    range,
    numberOfPoints,
  }: IRequest): Promise<IResponse> {
    const cachedData = await this.cache.get<IStockChartDataDTO>(
      `chart:${ticker}&${range}&${numberOfPoints}`,
    );

    if (cachedData) {
      return cachedData;
    }

    const requestData = await this.client.fetchChartData(ticker, {
      range,
      numberOfPoints,
    });

    this.cache.set(`chart:${ticker}&${range}&${numberOfPoints}`, requestData);

    return requestData;
  }
}

export default StockChartDataService;
