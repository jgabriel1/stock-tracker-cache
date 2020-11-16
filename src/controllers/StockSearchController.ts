import { Request, Response } from 'express';

import container from '../container';
import StockSearchService from '../services/StockSearchService';

class StockSearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { query } = request.query;

    const stockSearch = container.resolve<StockSearchService>('stockSearch');

    const data = await stockSearch.execute({
      query: String(query) || '',
    });

    return response.json({ data });
  }
}

export default StockSearchController;
