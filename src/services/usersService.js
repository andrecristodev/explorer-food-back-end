const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }

    async create({ name, email, password }) {
        const checkUserExists = await this.usersRepository.findByEmail(email)

        if (checkUserExists) {
            throw new AppError('Este e-mail já existe', 409)
        }

        const hashedPassword = await hash(password, 8)
        const userCreated = await this.usersRepository.create({ name, email, password: hashedPassword })

        return userCreated
    }

    async update({ id, name, email, password, oldPassword }) {
        const checkUserExists = await this.usersRepository.show({ id })

        if (!checkUserExists) {
            throw new AppError('Usuário não encontrado', 404)
        }

        name = name ?? checkUserExists.name
        email = email ?? checkUserExists.email

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email)

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== checkUserExists.id) {
            throw new AppError('Este e-mail já está em uso', 403)
        }

        if (!password && oldPassword) {
            throw new AppError('Você precisa informar a senha atual para redefini-la', 403)
        }

        if (password && !oldPassword) {
            throw new AppError('Você precisa informar a senha antiga para redefini-la', 403)
        }

        if (password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, checkUserExists.password)

            if (!checkOldPassword) {
                throw new AppError('Senha antiga não confere', 403)
            }
            password = await hash(password, 8)
        }

        await this.usersRepository.update({ id, name, email, password })

        return
    }

}

module.exports = UsersService