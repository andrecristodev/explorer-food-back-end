class UsersRepositoryInMemory {
    constructor() {
      this.users = []
    }
  
    async findByEmail(email) {
      return this.users.find(user => user.email === email)
    }
  
    async create(user) {
      const userId = this.users.length + 1
      const userCreated = { ...user, id: userId }

      this.users.push(userCreated)

      return userCreated
    }
  
    async show(id) {
      return this.users.find(user => user.id === id)
    }
  
    async update({ id, name, email, password }) {
      const index = this.users.findIndex(user => user.id === id)

      if (index < 0) {
        return null
      }

      const userUpdated = {
        ...this.users[index],
        name: name || this.users[index].name,
        email: email || this.users[index].email,
        password: password || this.users[index].password,
      }

      this.users[index] = userUpdated
      
      return userUpdated
    }
  }
  
  module.exports = UsersRepositoryInMemory
  