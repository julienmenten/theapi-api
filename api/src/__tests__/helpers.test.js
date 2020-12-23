const apiHelpers = require('../helpers/apiHelpers');

const supertest = require('supertest');

describe('Test if we can fetch data from a random API online', () => {
    it('should return a status of 200', async done => {
        const TEST_URL = "https://api.chucknorris.io/jokes/random";
        let api = await apiHelpers.fetchNewAPIData(TEST_URL);
      
        expect(api)
        .toStrictEqual(
            expect.objectContaining({
                content: expect.any(String),
                status: expect.any(Number)
            })
        )
        done()
    })
});
