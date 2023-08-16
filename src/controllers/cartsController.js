const CartsRepository = require('../repositories/cartsRepository')
const CartsService = require('../services/cartsService')

class CartsController {
    async create(request, response) {
        const { dish_id, quantity } = request.body
        const user_id = request.user.id

        const cartsRepository = new CartsRepository()
        const cartsService = new CartsService(cartsRepository)

        await cartsService.create({ dish_id, user_id, quantity })

        response.status(201).json()
    }

    async show(request, response) {
        const { id } = request.params
        const user_id = request.user.id

        const cartsRepository = new CartsRepository()
        const cartsService = new CartsService(cartsRepository)

        const cart = await cartsService.show({ user_id, dish_id: id })

        response.status(200).json(cart)
    }

    async index(request, response) {
        const user_id = request.user.id

        const cartsRepository = new CartsRepository()
        const cartsService = new CartsService(cartsRepository)

        const carts = await cartsService.index(user_id)

        response.status(200).json(carts)
    }

    async update(request, response) {
        const { quantity } = request.body
        const { id } = request.params
        const user_id = request.user.id

        const cartsRepository = new CartsRepository()
        const cartsService = new CartsService(cartsRepository)

        const carts = await cartsService.update({ id, user_id, quantity })

        response.status(200).json(carts)
    }

    async delete(request, response) {
        const { id } = request.params
        const user_id = request.user.id

        const cartsRepository = new CartsRepository()
        const cartsService = new CartsService(cartsRepository)

        const deleted = await cartsService.delete({ id, user_id })

        response.status(204).json(deleted)
    }
}

module.exports = CartsController