const knex = require('../database/knex')

class OrdersRepository {
    async show({ id }) {
        const order = await knex('orders')
            .where({ id })
            .first()

        return order
    }

    async createOrder({ user_id, orderStatus, totalPrice, paymentMethod }) {
        const [id] = await knex('orders').insert({
            user_id,
            orderStatus,
            totalPrice,
            paymentMethod
        })

        return id
    }

    async itemsInsert(orderItems) {
        const items = await knex('ordersItems')
            .insert(orderItems)

        return items
    }

    async update({ id, orderStatus }) {
        const orderUpdated = await knex('orders')
            .where({ id })
            .update({ orderStatus })

        return orderUpdated
    }

    async indexOrdersNoAdmin({ user_id }) {
        const orders = await knex('ordersItems')
            .where({ user_id })
            .select([
                'orders.id',
                'orders.user_id',
                'orders.orderStatus',
                'orders.totalPrice',
                'orders.paymentMethod',
                'orders.created_at',
            ])
            .innerJoin('orders', 'orders.id', 'ordersItems.order_id')
            .groupBy('orders.id')

        return orders
    }

    async indexOrdersAdmin() {
        const orders = await knex('ordersItems')
            .select([
                'orders.id',
                'orders.user_id',
                'orders.orderStatus',
                'orders.totalPrice',
                'orders.paymentMethod',
                'orders.created_at',
            ])
            .innerJoin('orders', 'orders.id', 'ordersItems.order_id')
            .groupBy('orders.id')

        return orders
    }

    async indexOrdersItems() {
        const items = await knex('ordersItems')
        return items
    }


    async showUser({ id }) {
        const user = await knex('users')
            .where({ id })
            .first()

        return user
    }
}

module.exports = OrdersRepository