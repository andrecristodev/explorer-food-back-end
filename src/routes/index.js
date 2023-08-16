const { Router } = require('express')

const usersRouter = require('./users.routes')
const sessionsRouter = require('./sessions.routes')
const dishesRouter = require('./dishes.routes')
const ordersRoutes = require('./orders.routes')
const favoritesRoutes = require('./favorites.routes')
const cartsRoutes = require('./carts.routes')
const routes = Router()

routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/dishes', dishesRouter)
routes.use('/orders', ordersRoutes)
routes.use('/favorites', favoritesRoutes)
routes.use('/carts', cartsRoutes)

module.exports = routes