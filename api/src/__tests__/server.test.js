const Server  = require('http');
const supertest = require('supertest');
const app = require('../server');

const request = supertest(app)

describe(' GET /api', ()=> {
    test('responds with 200', async (done) => {
         const response = await request.get('/api')
         expect(response.status).toBe(200, done())
       
    })
})


describe(' Fetch the data of an API submitted by the user', () => {
    test('Responds with the contect of the API', async (done) => {
        let testAPI = "https://api.chucknorris.io/jokes/random";
            expect(fetchNewAPIData(testAPI)).toBe(!undefined, done());
    })

    test('Responds with an error', async (done) => {
        expect(fetchNewAPIData(testAPI)).toBe(!undefined, done());
    })
})


describe('Create and POST a new API in the database, then remove that entry', () => {
    test('POST a new record to the DB', async (done) => {
        const TEST_API = {
            api_url: "https://jsonplaceholder.typicode.com/todos/1",
            api_name: "JSON placeholder test API",
            allowed_endpoints: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            description: "Free to use fake online REST API for testing and prototyping."
        }
    })

    test('GET that record from the DB', async (done) => {

    })

    test('UPDATE the name of the entry', async (done) => {

    })

    test('GET the updated record from the DB', async (done) => {

    })

    test('DELETE the entry', async (done) => {
        
    })
})