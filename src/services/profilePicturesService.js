const AppError = require('../utils/AppError')
const DisckStorage = require('../providers/DisckStorage')

class ProfilePicturesService {
    constructor(profileRepository) {
        this.profileRepository = profileRepository
    }

    async update({ id, picture }) {
        const checkUserExists = await this.profileRepository.show(id)

        if (!checkUserExists) {
            throw new AppError('Somente usuários autenticados podem mudar o avatar', 401)
        }

        const disckStorage = new DisckStorage()

        if (checkUserExists.avatar) {
            await disckStorage.deleteFile(checkUserExists.avatar)
        }

        const avatar = await disckStorage.saveFile(picture)

        await this.profileRepository.update({ id, avatar })

        return { avatar }
    }
}

module.exports = ProfilePicturesService