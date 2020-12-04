const supertest = require('supertest');
const app = require('../server');

const request = supertest(app)

describe(' GET /test', ()=> {
    test('responds with 200', async (done) => {
         const response = await request.get('/test')
         expect(response.status).toBe(200, done())
       
    })
})