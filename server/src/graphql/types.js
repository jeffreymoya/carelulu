const typeDefs = `#graphql
    type Task {
        id: ID!
        name: String!
        done: Boolean!
        user: User!
    }
  
    type User {
        id: ID!
        username: String!
        password: String!
        tasks: [Task!]!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        tasks(userId: ID): [Task!]!
        task(id: ID!): Task
    }

    type Mutation {
        createTask(name: String!, userId: ID!): Task!
        updateTask(id: ID!, name: String, done: Boolean): Task!
        deleteTask(id: ID!): ID!
    }
`;

module.exports = typeDefs;