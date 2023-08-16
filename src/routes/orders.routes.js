const { Router } = require('express')

const OrdersController = require('../controllers/OrdersController')

const ordersController = new OrdersController()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const ensureUserIsAdmin = require('../middlewares/ensureUserIsAdmin')

const ordersRoutes = Router()

ordersRoutes.use(ensureAuthenticated)

ordersRoutes.post('/', ordersController.create)
ordersRoutes.put('/', ensureUserIsAdmin, ordersController.update)
ordersRoutes.get('/',ordersController.index)

module.exports = ordersRoutes