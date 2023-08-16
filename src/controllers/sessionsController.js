const SessionsRepository = require('../repositories/sessionsRepository')
const SessionsService = require('../services/sessionsService')

class SessionsController {
    async create(request, response) {
        const { email, password } = request.body

        const sessionsRepository = new SessionsRepository()
        const sessionsService = new SessionsService(sessionsRepository)

        const { user, token } = await sessionsService.create({ email, password })
        
        response.status(200).json({ user, token })
    }
}
module.exports = SessionsController