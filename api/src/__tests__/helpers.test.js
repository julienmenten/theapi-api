const apiHelpers = require('../helpers/apiHelpers');


describe('Test if we can fetch data from a random API online', () => {
    it('should return a status of 200 and a stringified content', async done => {
        const TEST_URL = "https://api.chucknorris.io/jokes/random";
        let api = await apiHelpers.fetchNewAPIData(TEST_URL);
      
        expect(api)
        .toStrictEqual(
            expect.objectContaining({
                properties : expect.any(String),
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
            expect.arrayContaining([{attribute_name:'name', attribute_type: 'String'}, {attribute_name:'age', attribute_type: 'Number'}, {attribute_name:'hobbies', attribute_type: "Object"}])
        )
        expect(apiHelpers.formatProperties(testUser)).not.toEqual(
            expect.arrayContaining(['username', 'birthday', 'hobbies'])
        )
        done()
    })

    test("Analyzes the properties of an object and returns the type of the property", async done => {
        expect(apiHelpers.formatProperties(testUser)).toEqual(
            expect.arrayContaining([{attribute_name:'name', attribute_type: 'String'}, {attribute_name:'age', attribute_type: 'Number'}, {attribute_name:'hobbies', attribute_type: 'Object'}])
        )
        done()
    })

    test("Read an API online and analyze the properties and return their types and names", async done => {


        done()
    })
})

describe("Test if the requested API returns an Array of results, or only a simple JSON" , () => { 
    const TestArray = [1, 2, 3]
    const TestJSON = {
        "username": "John Doe",
        "age": 24
    }
    it("should return 'false' in case it is not an array", (done) => {
        expect(apiHelpers.detectIsArray(TestJSON)).not.toBeTruthy()
        expect(apiHelpers.detectIsArray(TestJSON)).toBeFalsy()
        done()
    })
    it("Should return 'true' when the inut is an array", (done) => {
        expect(apiHelpers.detectIsArray(TestArray)).toBeTruthy()
        done()
    })
})