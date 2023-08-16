const SessionsService = require('../services/SessionsService')
const SessionsRepositoryInMemory = require('../repositories/SessionsRepositoryInMemory')
const AppError = require('../utils/AppError')

let sessionsRepositoryInMemory
let sessionsService

describe('SessionsService', () => {
  beforeEach(() => {
    sessionsRepositoryInMemory = new SessionsRepositoryInMemory()
    sessionsService = new SessionsService(sessionsRepositoryInMemory)
  })

  it('should be able to authenticate a user', async () => {
    const email = 'userTest@example.com'
    const password = '123456'

    const token = await sessionsService.create({ email, password })

    expect(token).toBeTruthy()
  })

  it('should not be able to authenticate with non existing user', async () => {
    const email = 'nonexistent@example.com'
    const password = '123456'

    await expect(sessionsService.create({ email, password })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', async () => {
    const email = 'userTest@example.com'
    const password = 'wrongpassword'

    await expect(sessionsService.create({ email, password })).rejects.toBeInstanceOf(AppError)
  })
})
