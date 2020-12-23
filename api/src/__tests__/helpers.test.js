const apiHelpers = require('../helpers/apiHelpers');

const supertest = require('supertest');

describe('Test if we can fetch data from a random API online', () => {
    it('should return a status of 200 and a stringified content', async done => {
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

describe("Test the ability to analyze a JSON file and it's properties and their types" , () => { 
    const testUser = {
        name: "JohnDoe",
        age: 26,
        hobbies: ['football', 'games']
    }
    test("Read the properties of an object", async done => {
        expect(apiHelpers.formatProperties(testUser)).toEqual(
            expect.arrayContaining(['name', 'age', 'hobbies'])
        )
        expect(apiHelpers.formatProperties(testUser)).not.toEqual(
            expect.arrayContaining(['username', 'birthday', 'hobbies'])
        )
        done()
    })

    test("Analyzes the properties of an object and returns the type of the property", async done => {


        done()
    })

    test("Read an API online and analyze the properties and return their types and names", async done => {


        done()
    })
})

