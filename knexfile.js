const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db'),
      version: '3.39.1'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (connection, callback) => connection.run('PRAGMA foreign_keys = ON', callback)
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    useNullAsDefault: true
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db'),
      version: '3.39.1'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (connection, callback) => connection.run('PRAGMA foreign_keys = ON', callback)
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    useNullAsDefault: true
  }
}