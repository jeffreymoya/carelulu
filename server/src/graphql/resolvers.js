const resolvers = {
    Query: {
        users: (_, __, { knex }) => knex('users').select('*'),
        user: (_, { id }, { knex }) => knex('users').where({ id }).first(),
        tasks: (_, {userId}, { knex }) => {
            let query = knex('tasks').select('*');
            if (userId) query = query.where({ user_id: userId });
            return query;
        },
        task: (_, { id }, { knex }) => knex('tasks').where({ id }).first(),
    },
    Mutation: {
        createTask: (_, { name, userId }, { knex }) => knex('tasks').insert({ name, user_id: userId }).then(ids => knex('tasks').where({ id: ids[0] }).first()),
        updateTask: (_, { id, name, done }, { knex }) => knex('tasks').where({ id }).update({ name, done }).then(() => knex('tasks').where({ id }).first()),
        deleteTask: (_, { id }, { knex }) => knex('tasks').where({ id }).del().then(() => id),
    },
};

module.exports = resolvers;