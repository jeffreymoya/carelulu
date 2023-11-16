(async () => {
    const {createApolloServer} = require("./src/graphql/server")
    const startApp = require("./app")
    const servers = await startApp(createApolloServer());

    process.on('SIGTERM', () => {
        servers.close();
    });
})()
