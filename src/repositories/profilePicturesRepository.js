const knex = require('../database/knex')

class ProfilePicturesRepository {
    async show(id) {
        const userId = await knex('users')
            .where('id', id)
            .first()

        return userId
    }

    async update({ id, avatar }) {
        const avatarUpdated = await knex('users')
            .where({ id })
            .update({ avatar })
            
        return avatarUpdated
    }

}

module.exports = ProfilePicturesRepository