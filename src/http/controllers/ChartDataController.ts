import { Request, Response } from 'express';

import container from '../../container';
import StockChartDataService from '../../services/StockChartDataService';

class ChartDataController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { ticker } = request.params;
    const { range, numberOfPoints } = request.query;

    const chartData = container.resolve<StockChartDataService>(
      'stockChartData',
    );

    const data = await chartData.execute({
      ticker: String(ticker),
      range: String(range) || '1d',
      numberOfPoints: Number(numberOfPoints) || 20,
    });

    return response.json({ data });
  }
}

export default ChartDataController;
