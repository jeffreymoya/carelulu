const chai = require('chai');
const expect = chai.expect;
const {describe, it} = require('mocha');
const request = require('supertest');
const startApp = require('../app');
const {createApolloServer} = require("../src/graphql/server")
require('dotenv').config();

describe('Login API', () => {
    let servers;
    beforeEach(async () => {
        servers = await startApp(createApolloServer());
    });
    afterEach(() => {
        servers.close();
    })
    it('should return a JWT token on successful login', (done) => {
        request(servers.baseUrl)
            .post(process.env.LOGIN_ENDPOINT)
            .send({ username: 'john', password: 'john' })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.all.keys("id", "username");
                expect(res.body.id).to.be.eq(1);
                expect(res.body.username).to.eq("john");
                done();
            });
    });

    function assertError(username, password, message) {
        return (done) => {
            request(servers.baseUrl)
                .post(process.env.LOGIN_ENDPOINT)
                .send({username: username, password: password})
                .expect(401)
                .end((err, res) => {
                    if (err) return done(err);
                    done();
                });
        }
    }

    it('should return an error on invalid username', assertError('invalidusername', 'john', 'Invalid username'));

    it('should return an error on invalid password', assertError('john', 'invalidpassword', 'Invalid username or password'));
});
