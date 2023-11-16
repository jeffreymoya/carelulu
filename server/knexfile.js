require('dotenv').config();
if (
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_USER ||
    !process.env.DB_DATABASE
) {
    throw new Error('Please configure the database environment variables first!')
}

module.exports = {
    client: 'mysql2',
    debug: true,
    asyncStackTraces: true,
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    }
};
