exports.up = function (knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.boolean('done').defaultTo(false);
        table.integer('user_id').unsigned().references('id').inTable('users');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
};
