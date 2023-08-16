const path = require('path')

const ProfilePicturesService = require('../services/ProfilePicturesService')
const ProfileRepositoryInMemory = require('../repositories/ProfileRepositoryInMemory')
const AppError = require('../utils/AppError')

let profilePicturesService

describe('ProfilePicturesService', () => {
    beforeEach(() => {
        const profileRepositoryInMemory = new ProfileRepositoryInMemory()
        profilePicturesService = new ProfilePicturesService(profileRepositoryInMemory)
    })

    it('should update user avatar', async () => {
        const avatarFilename = 'Avatar.png'
        const localStorage = path.resolve(__dirname, '..', '..', 'tmp', 'imageTest', avatarFilename)

        const updatedUser = await profilePicturesService.update({ id: 1, picture: localStorage })

        expect(updatedUser.avatar).not.toBeNull()
    })

    it('should throw an error when user is not authenticated', async () => {
        const avatarFilename = 'Avatar.png'

        await expect(profilePicturesService.update({ id: 6, picture: avatarFilename })).rejects.toEqual(new AppError('Somente usuários autenticados podem mudar o avatar', 401))
    })
})