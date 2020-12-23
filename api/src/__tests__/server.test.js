const e = require('express');
const Server  = require('http');
const supertest = require('supertest');
const app = require('../server');

const request = supertest(app)

 // Variables
let UUID = "";
const TEST_API = {
    api_url: "https://jsonplaceholder.typicode.com/todos/1",
    api_name: "JSON placeholder test API",
    allowed_endpoints: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    description: "Free to use fake online REST API for testing and prototyping."
}

describe(' GET /api', ()=> {
    test('responds with 200', async done => {
         const response = await request.get('/apis')
         expect(response.status).toBe(200)
         done()
    })
})

describe('Create and POST a new API in the database, then remove that entry', () => {

    test('POST a new entry to the DB', async done => {
        const response = await request.post('/apis').send(TEST_API)
        UUID = response.body.id
       
        expect(response.status).toBe(200)
        done()
    })

    test('GET the new entry from the DB', async done => {
        const response = await request.get(`/apis/${UUID}`)
        expect(response.status).toBe(200)
        done()
    })

    test('UPDATE the name of the entry', async done => {
        const response = await request.patch(`/apis/${UUID}`)
            .send({
                api_name: "Test PATCH"
            })
        expect(response.status).toBe(200)
        done()
    })

   
})


describe('DELETE /apis/:id', () => {
    test('DELETE the entry', async done => {
        const response = await request.delete(`/apis/${UUID}`)
        expect(response.status).toBe(200)
        done()
    })
    
});


describe('GET /apis/:id', () => {
    it('should return "API not found" when an incorrect id has been provided', async done => {

        const fakeId = "b596d3f5-c83e-4402-a54a-756fc7f7efe1"

        const response = await request.get(`/apis/${fakeId}`)
        expect(response.status).not.toBe(200)
        expect(response.text).toBe("API not found");
        done()
    });
})