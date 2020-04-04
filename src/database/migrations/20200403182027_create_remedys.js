
exports.up = function (knex) {
    return knex.schema.createTable('remedys', function (table) {
        table.increments();

        table.string('shift').notNullable();
        table.string('description');
        table.string('remedy').notNullable();
        table.integer('amount').notNullable();
        table.timestamp('hours').notNullable();

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');

    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('remedys');
};
