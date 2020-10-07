const { Router } = require('express')
const StockInfoController = require('./controllers/StockInfoController')
const StockSearchController = require('./controllers/StockSearchController')

const router = Router()

const stockInfoController = new StockInfoController()
const stockSearchController = new StockSearchController()

router.get('/info', stockInfoController.index)
router.get('/search', stockSearchController.index)

module.exports = router
