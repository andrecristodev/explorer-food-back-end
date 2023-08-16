const AppError = require('../utils/AppError')
const DisckStorage = require('../providers/DisckStorage')

class DishesService {
    constructor(dishesRepository) {
        this.dishesRepository = dishesRepository
    }

    async create({ title, description, category, price, ingredients, image }) {
        const checkDishesExists = await this.dishesRepository.findByTitle(title)

        if (checkDishesExists) {
            throw new AppError('Produto já cadastrado no sistema', 409)
        }

        const disckStorage = new DisckStorage()

        const imageFile = await disckStorage.saveFile(image)

        const dish_id = await this.dishesRepository.create({ title, description, category, price, image: imageFile })

        const hasOnlyOneIngredient = typeof ingredients === 'string'

        const ingredientsInsert = hasOnlyOneIngredient
            ?
            {
                name: ingredients,
                dish_id
            }
            :
            ingredients.map(name => ({
                name,
                dish_id
            }))

        const dish = await this.dishesRepository.insertIngredients(ingredientsInsert)

        return dish
    }

    async update({ id, title, description, category, price, ingredients, image }) {
        const checkDishesExists = await this.dishesRepository.findById(id)

        if (checkDishesExists.image && image) {
            const disckStorage = new DisckStorage()

            await disckStorage.deleteFile(checkDishesExists.image)
            image = await disckStorage.saveFile(image)
        }

        title = title ?? checkDishesExists.title
        description = description ?? checkDishesExists.description
        category = category ?? checkDishesExists.category
        price = price ?? checkDishesExists.price
        image = image ?? checkDishesExists.image

        await this.dishesRepository.update({ id, title, description, category, price, image })

        const hasOnlyOneIngredient = typeof ingredients === 'string'

        const dishes = await this.dishesRepository.deleteIngredients({ dish_id: checkDishesExists.id })

        let ingredientsInsert

        if (ingredients) {
            if (hasOnlyOneIngredient) {
                ingredientsInsert = {
                    name: ingredients,
                    dish_id: id
                }
            } else if (ingredients.length > 1) {
                ingredientsInsert = ingredients.map((name) => {
                    return {
                        name: name,
                        dish_id: id
                    }
                })
            }
            await this.dishesRepository.updateIngredients({ dish_id: id, ingredientsInsert })
        }

        return dishes
    }

    async index({ title, ingredients }) {
        let dishes

        if (ingredients) {
            const filterIngredients = typeof ingredients === 'string' ? ingredients.split(',').map(ingredient => ingredient.trim()) : null

            dishes = await this.dishesRepository.indexIngredients({ filterIngredients, title })
        } else {
            dishes = await this.dishesRepository.indexTitle(title)
        }

        const dishesWithIngredients = await this.dishesRepository.dishesIngredients()

        const dishedWithIngredient = dishes.map(dish => {
            const dishIngredient = dishesWithIngredients.filter(ingredient => ingredient.dish_id === dish.id)
            return {
                ...dish,
                ingredients: dishIngredient
            }
        })

        return dishedWithIngredient
    }

    async show(id) {
        const dish = await this.dishesRepository.findById(id)
        const ingredients = await this.dishesRepository.ingredientsShow({ dish_id: id })

        return {
            ...dish,
            ingredients
        }
    }

    async delete(id) {
        const checkDishesExists = await this.dishesRepository.findById(id)

        if (!checkDishesExists) {
            throw new AppError('Prato não encontrado')
        }

        await this.dishesRepository.delete(id)

        return 'Prato deletado'
    }
}

module.exports = DishesService