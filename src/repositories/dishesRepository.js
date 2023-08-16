const knex = require('../database/knex')

class DishesRepository {
    async findByTitle(title) {
        const titleDishes = await knex('dishes')
            .where({ title })
            .first()

        return titleDishes
    }

    async findById(id) {
        const dishes = await knex('dishes')
            .where({ id })
            .first()

        return dishes
    }

    async create({ title, description, category, price, image }) {
        const [id] = await knex('dishes').insert({
            title,
            description,
            category,
            price,
            image
        })

        return id
    }

    async insertIngredients(ingredients) {
        const ingredientsInsert = await knex('ingredients').insert(ingredients)

        return ingredientsInsert
    }

    async update({ id, title, description, category, price, image }) {
        const dishUpdated = await knex('dishes')
            .where({ id })
            .update({
                title,
                description,
                category,
                price,
                image
            })

        return dishUpdated
    }

    async deleteIngredients({ dish_id }) {
        const ingredientsDelete = await knex('ingredients')
            .where({
                dish_id
            })
            .delete()

        return ingredientsDelete
    }

    async updateIngredients({ dish_id, ingredientsInsert }) {
        const ingredientsUpdated = await knex('ingredients')
            .where({ dish_id })
            .insert(ingredientsInsert)

        return ingredientsUpdated
    }

    async indexIngredients({ filterIngredients, title }) {
        const ingredientsIndex = await knex('ingredients')
            .select([
                'dishes.id',
                'dishes.title',
                'dishes.description',
                'dishes.category',
                'dishes.price',
                'dishes.image'
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
            .groupBy('dishes.id')
            .orderBy('dishes.title')

        return ingredientsIndex
    }

    async indexTitle(title) {
        const titleDishes = await knex('dishes')
            .whereLike(
                'title',
                `%${title}%`
            )

        return titleDishes
    }

    async dishesIngredients() {
        return await knex('ingredients')
    }

    async ingredientsShow({ dish_id }) {
        const ingredients = knex('ingredients')
            .where({ dish_id })
            .orderBy('name')

        return ingredients
    }

    async delete(id) {
        const deleted = knex('dishes')
            .where({ id })
            .delete()

        return deleted
    }
}

module.exports = DishesRepository