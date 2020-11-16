import { Request, Response } from 'express';

import container from '../../container';
import StockInfoService from '../../services/StockInfoService';

class StockInfoController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { tickers } = request.query;

    const stockInfo = container.resolve<StockInfoService>('stockInfo');

    const data = await stockInfo.execute({
      tickers: String(tickers).split(',') || [],
    });

    return response.json({ data });
  }
}

export default StockInfoController;
