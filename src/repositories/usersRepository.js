const knex = require('../database/knex')

class UsersRepository {
    async findByEmail(email) {
        const user = await knex('users')
            .where({ email })
            .first()

        return user
    }

    async create({ name, email, password }) {
        const userId = await knex('users')
            .insert({
                name,
                email,
                password
            })

        return {
            id: userId
        }
    }

    async show({ id }) {
        const userId = await knex('users')
            .where({ id })
            .first()

        return userId
    }

    async update({ id, name, email, password }) {
        const userUpdated = knex('users')
            .where({ id })
            .update({
                name,
                email,
                password
            })

        return userUpdated
    }
}

module.exports = UsersRepository