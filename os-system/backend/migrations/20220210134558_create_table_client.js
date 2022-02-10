
exports.up = function(knex) {
    return knex.schema.createTable('clients', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('phone')
        table.string('zip_code')
        table.string('street')
        table.string('neighborhood')
        table.string('number_house')
        table.string('complement')
        table.string('city')
        table.string('state')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('clients')
};
