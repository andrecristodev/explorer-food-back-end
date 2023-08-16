const UsersService = require('./UsersService')
const UsersRepositoryInMemory = require('../repositories/UsersRepositoryInMemory')
const AppError = require('../utils/AppError')

let usersService

describe('UsersService', () => {
    beforeEach(() => {
        const usersRepositoryInMemory = new UsersRepositoryInMemory()
        usersService = new UsersService(usersRepositoryInMemory)
    })

    it('should be able to create a new user', async () => {
        const user = {
            name: 'User Test',
            email: 'test@example.com',
            password: '123456'
        }

        const createdUser = await usersService.create(user)

        expect(createdUser).toHaveProperty('id')
        expect(createdUser.name).toBe(user.name)
        expect(createdUser.email).toBe(user.email)
    })

    it('should not be able to create a new user with an already registered email', async () => {
        const user = {
            name: 'User Test',
            email: 'test@example.com',
            password: '123456'
        }

        await usersService.create(user)

        await expect(usersService.create(user)).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to update a user', async () => {
        const user = {
            name: 'User Test',
            email: 'test@example.com',
            password: '123456'
        }

        const createdUser = await usersService.create(user)

        const updatedUser = await usersService.update({
            id: createdUser.id,
            name: 'User Test Update',
            email: 'testUpdat@example.com',
            password: '654321',
            oldPassword: user.password
        })

        expect(updatedUser).toHaveProperty('id')
        expect(updatedUser.name).toBe('User Test Update')
        expect(updatedUser.email).toBe('testUpdat@example.com')
    })

    it('should not be able to update a non-existent user', async () => {
        await expect(usersService.update({
            id: 'non-existent-id',
            name: 'User Test',
            email: 'test@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update a user with an already registered email', async () => {
        const user1 = {
            name: 'User Test',
            email: 'test@example.com',
            password: '123456'
        }

        const user2 = {
            name: 'Test User',
            email: 'testUser@example.com',
            password: '654321'
        }
        
        await usersService.create(user1)
        const createdUser2 = await usersService.create(user2)

        await expect(usersService.update({
            id: createdUser2.id,
            name: 'Test User',
            email: user1.email,
            password: '123456',
            oldPassword: user2.password
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update a user without providing the old password', async () => {
        const user = {
            name: 'User Test',
            email: 'test@example.com',
            password: '123456'
        }

        const createdUser = await usersService.create(user)

        await expect(usersService.update({
            id: createdUser.id,
            name: 'Test User',
            email: 'testUser@example.com',
            password: '654321',
            oldPassword: ''
        })).rejects.toBeInstanceOf(AppError)
    })

})