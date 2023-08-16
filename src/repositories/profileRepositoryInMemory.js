class ProfileRepositoryInMemory {
    constructor() {
        this.users = [{
            id: 1,
            avatar: null
        }]
    }

    async show(id) {
        const user = this.users.find(user => user.id === id)

        return user
    }

    async update({ id, avatar }) {
        const userIndex = this.users.findIndex(user => user.id === id)

        this.users[userIndex].avatar = avatar

        return this.users[userIndex]
    }
}

module.exports = ProfileRepositoryInMemory
