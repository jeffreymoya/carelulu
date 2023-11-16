const {describe, it} = require('mocha');
const { createMockServer } = require('./mockApolloServer');
const request = require('supertest');
const chai = require("chai")
const expect = chai.expect;
const startApp = require("../app")
require('dotenv').config();

describe('Task GraphQL Queries', () => {
    let servers;
    before(async () => {
        servers = await startApp(createMockServer(), false);
    });
    after(() => {
        servers.close();
    })

    it('should fetch all tasks', async () => {
        const response = await request(servers.baseUrl)
            .post(process.env.GRAPHQL_ENDPOINT)
            .send({
                query: `
              {
                tasks {
                  id
                  name
                  done
                }
              }
            `,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.data.tasks.length).to.be.gt(0);
        expect(response.body.data.tasks[0]).to.have.all.keys("id", "name", "done");
    });

    it('should fetch a single task', async () => {
        const taskId = "3";
        const response = await request(servers.baseUrl)
            .post(process.env.GRAPHQL_ENDPOINT)
            .send({
                query: `
                  {
                    task(id: ${taskId}) {
                      id
                      name,
                      done
                    }
                  }
                `,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.data.task).to.be.not.null;
        expect(response.body.data.task).to.have.all.keys("id", "name", "done");
        expect(response.body.data.task.id).eq(taskId);
        expect(response.body.data.task.name.toLowerCase()).eq("mock task".toLowerCase());
    });

    it('should update a task', async () => {
        const response = await request(servers.baseUrl)
            .post(process.env.GRAPHQL_ENDPOINT)
            .send({
                query: `
                  mutation {
                    updateTask(name: "Mock Task", id: "1", done: false) {
                      id
                      name,
                      done
                    }
                  }
                `,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.data.updateTask).to.be.not.null;
        expect(response.body.data.updateTask).to.have.all.keys("id", "name", "done");
        expect(response.body.data.updateTask.id).eq("1");
        expect(response.body.data.updateTask.name.toLowerCase()).eq("mock task".toLowerCase());
    });

    it('should create a task', async () => {
        const userId = '1';
        const taskName = "mock task";
        const response = await request(servers.baseUrl)
            .post(process.env.GRAPHQL_ENDPOINT)
            .send({
                query: `
                  mutation {
                    createTask(name: \"${taskName}\", userId: ${userId}) {
                      id
                      name,
                      done
                    }
                  }
                `,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.data.createTask).to.be.not.null;
        expect(response.body.data.createTask).to.have.all.keys("id", "name", "done");
        expect(response.body.data.createTask.id).eq(userId);
        expect(response.body.data.createTask.name.toLowerCase()).eq(taskName.toLowerCase());
    });

    it('should delete a task', async () => {
        const taskId = '1';
        const response = await request(servers.baseUrl)
            .post(process.env.GRAPHQL_ENDPOINT)
            .send({
                query: `
                  mutation {
                    deleteTask(id: ${taskId})
                  }
                `,
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.data.deleteTask).to.be.not.null;
        expect(response.body.data.deleteTask).eq(taskId);
    });
});
