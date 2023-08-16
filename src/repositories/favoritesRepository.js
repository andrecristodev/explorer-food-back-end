const knex = require('../database/knex')

class FavoritesRepository {
    async create({ user_id, dish_id }) {
        const favoriteCreate = await knex('favorites')
            .insert({
                user_id,
                dish_id
            })

        return favoriteCreate
    }

    async show({ user_id, dish_id }) {
        const favorites = await knex('favorites')
            .where({
                user_id,
                dish_id
            })
            .first()

        return favorites
    }

    async indexIngredients({filterIngredients, title }) {
        const favorites = await knex('ingredients')
            .select([
                'dishes.id',
                'dishes.title',
                'dishes.image',
                'ingredients.name'
            ])
            .whereLike(
                'dishes.title',
                `%${title}%`
            )
            .whereIn(
                'ingredients.name',
                filterIngredients
            )
            .innerJoin(
                'dishes',
                'dishes.id',
                'ingredients.dish_id'
            )
            .orderBy('dishes.title')

        return favorites
    }

    async indexTitle({ user_id, title }) {
        const favorites = await knex('favorites')
            .select([
                'dishes.id',
                'dishes.title',
                'dishes.image'
            ])
            .where({
                user_id
            })
            .whereLike(
                'title',
                `%${title}%`
            )
            .innerJoin(
                'dishes',
                'dishes.id',
                'favorites.dish_id'
            )
            .orderBy('dishes.title')

        return favorites
    }

    async index(user_id) {
        const favorites = await knex('favorites')
            .select([
                'dishes.id',
                'dishes.title',
                'dishes.image',
            ])
            .where({
                user_id
            })
            .innerJoin(
                'dishes',
                'dishes.id',
                'favorites.dish_id'
            )
            .orderBy('dishes.title')

        return favorites
    }

    async favoritesIngredients() {
        return await knex('ingredients')
    }

    async delete({ user_id, dish_id }) {
        const deleted = knex('favorites')
            .where({
                user_id,
                dish_id
            })
            .delete()

        return deleted
    }
}

module.exports = FavoritesRepository