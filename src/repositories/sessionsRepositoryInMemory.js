class SessionsRepositoryInMemory {
    constructor() {
        this.users = [
            {
                id: 1,
                name: 'User Test ',
                email: 'userTest@example.com',
                password: '$2a$08$VJKEmQ/ENAfSfMyixvP77.SIY7vTxcrUXf2OBh28npd0IzmJP2w5q'
            }
        ]
    }

    async findByEmail(email) {
        const user = this.users.find((user) => user.email === email)

        return user || null
    }
}

module.exports = SessionsRepositoryInMemory
