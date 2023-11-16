const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../src/graphql/types');
const resolvers = {
    Query: {
        user: async (_, { id }) => ({ id, username: 'Mock User' }),
        users: async () => [{ id: 1, username: 'Mock User' }],
        task: async (_, { id }) => ({ id, name: 'Mock Task', done: false }),
        tasks: async () => [{ id: 1, name: 'Mock Task', done: false }],
    },
    Mutation: {
        createTask: async (_, { name, userId }) => ({ id: userId, name, done: false }),
        updateTask: async (_, { name, id, done }) => ({ id, name, done }),
        deleteTask: async (_, { id }) => id,
    },
};

const createMockServer = () => new ApolloServer({
    typeDefs,
    resolvers,
    mocks: false,
})

module.exports = { createMockServer };
