# Todo server

To use setup, follow these steps:

1. Install the project dependencies by running `npm install`

2. Install docker and docker-compose

3. Deploy MySQL by running `docker compose up -d`

4. Run the database migrations using `npx knex migrate:latest`

5. Seed the database with initial data using `npx knex seed:run`

## Running the project

To run the project, use the following command in your terminal:

```bash
npm start
```

## Test

To test the APIs, use the following command in your terminal:

```bash
npm test
```