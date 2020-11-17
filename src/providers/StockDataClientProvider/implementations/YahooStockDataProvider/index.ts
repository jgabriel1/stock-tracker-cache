import axios, { AxiosInstance } from 'axios';

import HTTPException from '../../../../errors/HTTPException';
import parseQueryResponse from './parsers/parseQueryResponse';
import parseStockInfoResponse from './parsers/parseStockInfoResponse';
import parseChartDataResponse from './parsers/parseChartDataResponse';

import IStockDataClientProvider from '../../models/IStockDataClientProvider';
import IFetchChartDataOptions from '../../models/IFetchChartDataOptions';

import IStockInfoDTO from '../../../../dtos/IStockInfoDTO';
import IStockQueryAnswerDTO from '../../../../dtos/IStockQueryAnswerDTO';
import IStockChartDataDTO from '../../../../dtos/IStockChartDataDTO';

import IYahooStockInfoResponseDTO from './dtos/IYahooStockInfoResponseDTO';
import IYahooStockQueryResponseDTO from './dtos/IYahooStockQueryResponseDTO';

import config from '../../../../config';

class YahooStockDataProvider implements IStockDataClientProvider {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: config.BASE_URL,
    });
  }

  public async fetchStockInfo(tickers: string[]): Promise<IStockInfoDTO[]> {
    if (tickers.length === 0) {
      return [];
    }

    const params = {
      symbols: tickers.join(','),
      range: '1d',
      interval: '1d',
    };

    const response = await this.client
      .get<IYahooStockInfoResponseDTO>('v7/finance/spark', { params })
      .catch(() => {
        throw new HTTPException(
          'Stock data service is currently unavailable.',
          503,
        );
      });

    try {
      const parsed = parseStockInfoResponse(response.data);

      return parsed;
    } catch (error) {
      throw new HTTPException('External api response format changed.', 500);
    }
  }

  public async fetchQueryAnswers(
    query: string,
    numAnswers = 5,
  ): Promise<IStockQueryAnswerDTO[]> {
    const params = {
      q: query,
      quotesCount: numAnswers,
      newsCount: 0,
      enableFuzzyQuery: false,
      enableEnhancedTrivialQuery: true,
    };

    const response = await this.client
      .get<IYahooStockQueryResponseDTO>('v1/finance/search', { params })
      .catch(() => {
        throw new HTTPException(
          'Stock data service is currently unavailable.',
          503,
        );
      });

    try {
      const parsed = parseQueryResponse(response.data);

      return parsed;
    } catch (error) {
      throw new HTTPException('External api response format changed.', 500);
    }
  }

  public async fetchChartData(
    ticker: string,
    { range, numberOfPoints }: IFetchChartDataOptions,
  ): Promise<IStockChartDataDTO> {
    const params = {
      symbols: ticker,
      range,
      numberOfPoints,
    };

    const response = await this.client
      .get<IYahooStockInfoResponseDTO>('v7/finance/spark', { params })
      .catch(() => {
        throw new HTTPException(
          'Stock data service is currently unavailable.',
          503,
        );
      });

    try {
      const parsed = parseChartDataResponse(response.data);

      return parsed;
    } catch (error) {
      throw new HTTPException('External api response format changed.', 500);
    }
  }
}

export default YahooStockDataProvider;
