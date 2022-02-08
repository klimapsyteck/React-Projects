
exports.up = function(knex) {
    return knex.schema.createTable('os', table => {
        table.increments('id').primary()
        table.string('client-name').notNull()
        table.string('status').notNull()
        table.string('value').notNull()
        table.string('equipment').notNull()
        table.string('informed-problem')
        table.string('reported-problem')
        table.string('general-information')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Os')
};
