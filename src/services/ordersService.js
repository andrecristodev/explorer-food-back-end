const AppError = require('../utils/AppError')

class OrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository
  }

  async create({ user_id, cart, orderStatus, totalPrice, paymentMethod }) {
    const order_id = await this.ordersRepository.createOrder({ user_id, orderStatus, totalPrice, paymentMethod })

    const orderItems = await cart.map(({ title, quantity, dish_id }) => ({
      title,
      quantity,
      dish_id,
      order_id
    }))

    await this.ordersRepository.itemsInsert(orderItems)

    return orderItems
  }

  async update({ id, orderStatus }) {
    const checkOrderExists = await this.ordersRepository.show({ id })

    if (!checkOrderExists) {
      throw new AppError('Pedido inexistente')
    }

    const orderUpdated = await this.ordersRepository.update({ id, orderStatus })

    return orderUpdated
  }

  async index({ user_id }) {
    const checkUserIsAdmin = await this.ordersRepository.showUser({ id: user_id })
    const ordersItems = await this.ordersRepository.indexOrdersItems()
    let orders

    if (checkUserIsAdmin.isAdmin === 1) {
      orders = await this.ordersRepository.indexOrdersAdmin()

    } else {
      orders = await this.ordersRepository.indexOrdersNoAdmin({ user_id })
    }

    const ordersWithItems = orders.map(order => {
      const orderItem = ordersItems.filter(item => item.order_id === order.id)

      return {
        ...order,
        items: orderItem
      }
    })

    return ordersWithItems
  }
}

module.exports = OrdersService