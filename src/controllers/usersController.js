const UsersRepository = require('../repositories/usersRepository')
const UsersService = require('../services/usersService')

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        const usersRepository = new UsersRepository()
        const usersService = new UsersService(usersRepository)

        await usersService.create({ name, email, password })

        response.status(201).json()
    }

    async update(request, response) {
        const { name, email, password, oldPassword } = request.body
        const user_id = request.user.id

        const usersRepository = new UsersRepository()
        const usersService = new UsersService(usersRepository)

        await usersService.update({ id: user_id, name, email, password, oldPassword })

        response.status(200).json()
    }

}

module.exports = UsersController