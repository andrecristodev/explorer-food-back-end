const DishesRepository = require('../repositories/dishesRepository')
const DishesService = require('../services/dishesService')

class DishesController {
    async create(request, response) {
        const { title, description, category, price, ingredients } = request.body
        const image = request.file.filename
        
        const dishesRepository = new DishesRepository()
        const dishesService = new DishesService(dishesRepository)


        await dishesService.create({ title, description, category, price, ingredients, image })

        response.status(201).json()
    }

    async update(request, response) {
        const { title, description, category, price, ingredients } = request.body
        const { id } = request.params

        const image = request.file ? request.file.filename : null

        const dishesRepository = new DishesRepository()
        const dishesService = new DishesService(dishesRepository)

        await dishesService.update({ id, title, description, category, price, ingredients, image })

        response.status(200).json()
    }

    async index(request, response) {
        const { title, ingredients } = request.query

        const dishesRepository = new DishesRepository()
        const dishesService = new DishesService(dishesRepository)

        const dishesWithIngredient = await dishesService.index({ title, ingredients })

        response.status(200).json({ dishesWithIngredient })

    }

    async show(request, response) {
        const { id } = request.params

        const dishesRepository = new DishesRepository()
        const dishesService = new DishesService(dishesRepository)

        const dishedWithIngredient = await dishesService.show(id)

        response.status(200).json({ dishedWithIngredient })
    }

    async delete(request, response) {
        const { id } = request.params

        const dishesRepository = new DishesRepository()
        const dishesService = new DishesService(dishesRepository)

        const deleted = await dishesService.delete(id)

        response.status(204).json(deleted)
    }
}

module.exports = DishesController
