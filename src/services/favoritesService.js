class FavoritesService {
    constructor(favoritesRepository) {
        this.favoritesRepository = favoritesRepository
    }

    async create({ user_id, dish_id }) {
        const favoritesCreated = await this.favoritesRepository.create({ user_id, dish_id })

        return favoritesCreated
    }

    async show({ user_id, dish_id }) {
        const checkFavoritesExists = await this.favoritesRepository.show({ user_id, dish_id })

        return checkFavoritesExists
    }

    async index({ user_id, title, ingredients }) {
        let favorites

        if (ingredients) {
            const filterIngredients = typeof ingredients === 'string' ? ingredients.split(',').map(ingredient => ingredient.trim()) : null

            favorites = await this.favoritesRepository.indexIngredients({ user_id, filterIngredients, title })
        } else {
            favorites = await this.favoritesRepository.indexTitle({ user_id, title })
        }

        const favoritesWithIngredients = await this.favoritesRepository.favoritesIngredients()

        const favoriteWithIngredient = favorites.map(favorite => {
            const favoriteIngredient = favoritesWithIngredients.filter(ingredient => ingredient.dish_id === favorite.id)
            return {
                ...favorite,
                ingredients: favoriteIngredient
            }
        })

        return favoriteWithIngredient
    }

    async delete({ user_id, dish_id }) {
        const deletedFavorites = await this.favoritesRepository.delete({ user_id, dish_id })

        return deletedFavorites
    }
}

module.exports = FavoritesService