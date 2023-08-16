const { Router } = require('express')

const CartsController = require('../controllers/CartsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const cartsController = new CartsController()
const cartsRoutes = Router()

cartsRoutes.use(ensureAuthenticated)

cartsRoutes.post('/', cartsController.create)
cartsRoutes.put('/:id', cartsController.update)
cartsRoutes.get('/', cartsController.index)
cartsRoutes.delete('/:id', cartsController.delete)

module.exports = cartsRoutes