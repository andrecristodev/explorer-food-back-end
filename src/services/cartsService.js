const AppError = require('../utils/AppError')

class CartsService {
    constructor(cartsRepository) {
        this.cartsRepository = cartsRepository
    }

    async create({ dish_id, user_id, quantity }) {
        const checkCartsExists = await this.cartsRepository.show({ user_id, dish_id })

        if (checkCartsExists) {
            if (checkCartsExists.quantity !== quantity) {
                const id = checkCartsExists.id
                const cartsUpdated = await this.cartsRepository.update({ id, user_id, quantity })

                return cartsUpdated
            }
            throw new AppError('Produto já existe no carrinho', 409)
        }

        const cartsCreated = this.cartsRepository.create({ dish_id, user_id, quantity })

        return cartsCreated
    }

    async index(user_id) {
        const carts = await this.cartsRepository.index(user_id)

        return carts
    }

    async update({ id, user_id, quantity }) {
        const cartsUpdated = await this.cartsRepository.update({ id, user_id, quantity })

        return cartsUpdated
    }

    async delete({ id, user_id }) {
        const deletedCarts = await this.cartsRepository.delete({ id, user_id })

        return deletedCarts
    }
}

module.exports = CartsService