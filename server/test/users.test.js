const request = require('supertest');
const {describe, it} = require('mocha');
const startApp = require("../app")
const chai = require("chai")
const {createMockServer} = require("./mockApolloServer")
const expect = chai.expect;
require('dotenv').config();

describe('User GraphQL Queries', () => {
    let servers;
    before(async () => {
        servers = await startApp(createMockServer(), false);
    });
    after(() => {
        servers.close();
    })

    it('should fetch all users', async () => {
        const response = await request(servers.baseUrl)
            .post(process.env.GRAPHQL_ENDPOINT)
            .send({
                query: `
              {
                users {
                  id
                  username
                }
              }
            `,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.data.users.length).to.be.gt(0);
        expect(response.body.data.users[0]).to.have.property("id");
        expect(response.body.data.users[0]).to.have.property("username");
    });

    it('should fetch a single user', async () => {
        const userId = "1";
        const response = await request(servers.baseUrl)
            .post(process.env.GRAPHQL_ENDPOINT)
            .send({
                query: `
                  {
                    user(id: ${userId}) {
                      id
                      username
                    }
                  }
                `,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.data.user).to.be.not.null;
        expect(response.body.data.user).to.have.property("id");
        expect(response.body.data.user).to.have.property("username");
        expect(response.body.data.user.id).eq(userId);
        expect(response.body.data.user.username.toLowerCase()).eq("mock user".toLowerCase());
    });
});
