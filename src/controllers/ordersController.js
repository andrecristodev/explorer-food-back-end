const OrdersRepository = require('../repositories/ordersRepository')
const OrdersService = require('../services/ordersService')

class OrdersController {
    async create(request, response) {
        const { cart, orderStatus, totalPrice, paymentMethod } = request.body
        const user_id = request.user.id

        const ordersRepository = new OrdersRepository()
        const ordersService = new OrdersService(ordersRepository)

        await ordersService.create({ user_id, cart, orderStatus, totalPrice, paymentMethod })

        response.status(200).json()
    }

    async update(request, response) {
        const { id, orderStatus } = request.body

        const ordersRepository = new OrdersRepository()
        const ordersService = new OrdersService(ordersRepository)

        await ordersService.update({ id, orderStatus })

        return response.status(200).json()
    }

    async index(request, response) {
        const user_id = request.user.id

        const ordersRepository = new OrdersRepository()
        const ordersService = new OrdersService(ordersRepository)

        const orders = await ordersService.index({ user_id })

        response.status(200).json( orders )
    }
}

module.exports = OrdersController