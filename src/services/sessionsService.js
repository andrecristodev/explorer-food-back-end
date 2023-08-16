const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

class SessionsService {
    constructor(sessionsRepository) {
        this.sessionsRepository = sessionsRepository
    }

    async create({ email, password }) {
        const checkUserExists = await this.sessionsRepository.findByEmail(email)

        if (!checkUserExists) {
            throw new AppError('E-mail e/ou senha incorretos', 401)
        }

        const passwordMatched = await compare(password, checkUserExists.password)

        if (!passwordMatched) {
            throw new AppError('E-mail e/ou senha incorretos', 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(checkUserExists.id),
            expiresIn
        })

        return { user:checkUserExists, token }
    }
}

module.exports = SessionsService