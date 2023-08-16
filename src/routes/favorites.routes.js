const { Router } = require('express')

const FavoritesController = require('../controllers/FavoritesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const favoritesController = new FavoritesController()

const favoritesRoutes = Router()

favoritesRoutes.use(ensureAuthenticated)

favoritesRoutes.post('/', favoritesController.create)
favoritesRoutes.get('/:id', favoritesController.show)
favoritesRoutes.get('/', favoritesController.index)
favoritesRoutes.delete('/:id',favoritesController.delete)

module.exports = favoritesRoutes