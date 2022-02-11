
exports.up = function(knex) {
    return knex.schema.createTable('os', table => {
        table.increments('id').primary()   
        table.string('status').notNull()
        table.string('value')
        table.string('equipment').notNull()
        table.string('informed_problem')
        table.string('reported_problem')
        table.string('general_information')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Os')
};
