const Server  = require('http');
const supertest = require('supertest');
const app = require('../server');

const request = supertest(app)

describe(' GET /api', ()=> {
    test('responds with 200', async (done) => {
         const response = await request.get('/apis')
         expect(response.status).toBe(200, done())
       
    })
})

describe('Create and POST a new API in the database, then remove that entry', () => {

    let UUID = "";
    test('POST a new entry to the DB', async (done) => {
        const TEST_API = {
            api_url: "https://jsonplaceholder.typicode.com/todos/1",
            api_name: "JSON placeholder test API",
            allowed_endpoints: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            description: "Free to use fake online REST API for testing and prototyping."
        }

        const response = await request.post('/apis').send(TEST_API)
        UUID = response.body.id
       
        expect(response.status).toBe(200, done())
    })

    test('GET the new entry from the DB', async (done) => {
        const response = await request.get(`/apis?id=${UUID}`)
        expect(response.status).toBe(200, done())
    })

    test('UPDATE the name of the entry', async (done) => {
        const response = await request.patch(`/apis/${UUID}`)
        expect(response.status).toBe(200, done())
    })

    test('GET the updated entry from the DB', async (done) => {
        const response = await request.get(`/apis/${UUID}`)
        expect(response.status).toBe(200, done())
    })

    test('DELETE the entry', async (done) => {
        const response = await request.delete(`/apis/${UUID}`)
        expect(response.status).toBe(200, done())
    })
})