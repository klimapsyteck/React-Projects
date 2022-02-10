
exports.up = function(knex) {
    return knex.schema.createTable('client_os', table => {
        table.increments('id').primary()
        table.string('idClient').notNull()
        table.string('idOs').notNull()
        table.string('idUser').notNull()
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('client_os')
};
