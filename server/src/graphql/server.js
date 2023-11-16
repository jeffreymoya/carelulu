const {ApolloServer} = require("apollo-server-express")
const knex = require("../knex")
const {shield} = require("graphql-shield");
const {validateCreateTaskInput, validateUpdateTaskInput, validateDeleteTaskInput, validateTasksQuery, validateTaskQuery} = require("../security/validation/tasks")
const {validateUserQuery, validateUsersQuery} = require("../security/validation/users")
const {applyMiddleware} = require("graphql-middleware")
const typeDefs = require("./types")
const resolvers = require("./resolvers")
const {makeExecutableSchema} = require("@graphql-tools/schema")
require("dotenv").config();
/**
 * Create an Apollo Server instance
 * Use the knex instance as the context
 * Combine all the typeDefs and resolvers from the definitions folder (user.js, task.js)
 * @returns {ApolloServer}
 */
const createApolloServer = () => {
    const validationRules = shield({
        Mutation: {
            createTask: validateCreateTaskInput,
            updateTask: validateUpdateTaskInput,
            deleteTask: validateDeleteTaskInput,
        },
        Query: {
            tasks: validateTasksQuery,
            task: validateTaskQuery,
            user: validateUserQuery,
            users: validateUsersQuery
        }
    });
    const schema = makeExecutableSchema({typeDefs, resolvers})
    const schemaWithMiddleware = applyMiddleware(schema, validationRules)
    return new ApolloServer({
        schema: schemaWithMiddleware,
        context: ({ req }) => ({
            user: req.user,
            knex,
        }),
    })
}

module.exports = {
    createApolloServer,
}