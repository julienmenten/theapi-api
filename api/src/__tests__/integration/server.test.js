const supertest = require('supertest');
const app = require('../../server');

describe(' GET /test', ()=> {
    test('responds with 200', async (done) => {
        try {
            await request
            .get('/test')
            .expect(200, done())
        }catch(e){

        }    
    })
})