const FavoritesRepository = require('../repositories/favoritesRepository')
const FavoritesService = require('../services/favoritesService')

class FavoritesController {
    async create(request, response) {
        const { id } = request.body
        const user_id = request.user.id

        const favoritesRepository = new FavoritesRepository()
        const favoritesService = new FavoritesService(favoritesRepository)

        await favoritesService.create({ user_id, dish_id: id })

        response.status(200).json()
    }

    async show(request, response) {
        const { id } = request.params
        const user_id = request.user.id

        const favoritesRepository = new FavoritesRepository()
        const favoritesService = new FavoritesService(favoritesRepository)

        const favorites = await favoritesService.show({ user_id, dish_id: id })

        response.status(200).json(favorites)
    }

    async index(request, response) {
        const { title, ingredients } = request.query
        const user_id = request.user.id

        const favoritesRepository = new FavoritesRepository()
        const favoritesService = new FavoritesService(favoritesRepository)

        const favorites = await favoritesService.index({ user_id, title, ingredients })

        response.status(200).json(favorites)
    }

    async delete(request, response) {
        const { id } = request.params
        const user_id = request.user.id

        const favoritesRepository = new FavoritesRepository()
        const favoritesService = new FavoritesService(favoritesRepository)

        const deleted = await favoritesService.delete({ user_id, dish_id: id })

        response.status(204).json(deleted)
    }
}

module.exports = FavoritesController