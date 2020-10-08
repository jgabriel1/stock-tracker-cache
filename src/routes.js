const { Router } = require('express')

const PingController = require('./controllers/PingController')
const StockInfoController = require('./controllers/StockInfoController')
const StockSearchController = require('./controllers/StockSearchController')

const router = Router()

const pingController = new PingController()
const stockInfoController = new StockInfoController()
const stockSearchController = new StockSearchController()

router.get('/', pingController.ping)

router.get('/info', stockInfoController.index)
router.get('/search', stockSearchController.index)

module.exports = router
