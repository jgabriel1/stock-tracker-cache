import { Router } from 'express';
import ChartDataController from './controllers/ChartDataController';

import PingController from './controllers/PingController';
import StockInfoController from './controllers/StockInfoController';
import StockSearchController from './controllers/StockSearchController';

const router = Router();

const pingController = new PingController();
const stockInfoController = new StockInfoController();
const stockSearchController = new StockSearchController();
const stockChartDataController = new ChartDataController();

router.get('/', pingController.ping);

router.get('/info', stockInfoController.index);
router.get('/search', stockSearchController.index);
router.get('/chart/:ticker', stockChartDataController.show);

export default router;
