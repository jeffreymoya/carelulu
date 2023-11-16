const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const helmet = require("helmet")
const passport = require("passport")
const configurePassport = require("./src/security/passport")
const router = require("./src/routes")
require("dotenv").config();

/**
 * Starts the application.
 *
 * @async
 * @param {Object} apolloServer - The Apollo server instance. Can use mockApolloServer.js to create a mock server.
 * @param {boolean} [enableAuth=true] - Whether to enable authentication. Use false for testing.
 * @returns {Object} An object containing the base URL of the server and a function to close the server.
 */
async function startApp(apolloServer, enableAuth = true) {
    const app = express();
    app.use(express.json(), cookieParser(), cors(), helmet());
    if (enableAuth) {
        app.use(passport.initialize());
        configurePassport();
        app.use(router)
        app.use(process.env.GRAPHQL_ENDPOINT, passport.authenticate('jwt', { session: false }));
    }
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: process.env.GRAPHQL_ENDPOINT });
    const baseUrl = `http://localhost:${process.env.SERVER_PORT}`
    const httpServer = app.listen({port: process.env.SERVER_PORT}, () => console.log(`Server ready at ${baseUrl}\nGraphQL at ${baseUrl}${process.env.GRAPHQL_ENDPOINT}`));

    return {
        baseUrl,
        close: () => {
            apolloServer.stop().finally(() => console.log('Apollo server closed'));
            httpServer.close(() => console.log('HTTP server closed'));
        }
    }
}

module.exports = startApp;