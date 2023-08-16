const knex = require('../database/knex')

class CartsRepository {
    async create({ dish_id, user_id, quantity }) {
        const cartsCreated = await knex('carts')
            .insert({
                dish_id,
                user_id,
                quantity
            })

        return cartsCreated
    }

    async show({ user_id, dish_id }) {
        const cart = await knex('carts')
            .where({
                user_id,
                dish_id
            })
            .first()

        return cart
    }

    async index(user_id) {
        const carts = await knex('carts')
            .select([
                'dishes.id',
                'dishes.title',
                'dishes.image',
                'dishes.price',
                'carts.quantity',
                'carts.id',
                'carts.dish_id'
            ])
            .where({
                user_id
            })
            .innerJoin(
                'dishes',
                'dishes.id',
                'carts.dish_id'
            )
            .orderBy('dishes.title')

        return carts
    }

    async update({ id, user_id, quantity }) {
        const cartsUpdated = await knex('carts')
            .where({
                id,
                user_id
            })
            .update({
                quantity
            })


        return cartsUpdated
    }

    async delete({ id, user_id }) {
        const deletedCarts = await knex('carts')
            .where({
                id,
                user_id
            })
            .delete()

        return deletedCarts
    }
}

module.exports = CartsRepository