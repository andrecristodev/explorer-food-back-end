exports.up = knex => knex.schema.createTable('carts', table => {
    table.increments('id')

    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.integer('dish_id').references('id').inTable('dishes').onDelete('CASCADE')

    table.integer('quantity')
})

exports.down = knex => knex.schema.dropTable('carts')