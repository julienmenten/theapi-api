const fetch = require('node-fetch');
   /*
 =================================================================
        FUNCTIONS MANIPULATING DATA
 =================================================================
*/
const ApiHelpers = {
    /* 
    Fetches the API provided at POST and uses that data to find the 
        Input: 
            URL: string

    This either returns the whole JSON object, or the first entry from the fetched data   
    */
    async fetchNewAPIData(URL) {
        let result 
        try{
            await fetch(URL)
            .then(async data => {
                let content = await data.json()
                
                if(this.detectIsArray(content)){
                    let firstOfArray = content[0]
                    console.log(firstOfArray)
                    return{
                           properties: firstOfArray,
                           status: data.status
                        }
                }else {
                    return {    
                            properties: content,
                            status: data.status
                        }
                }
               
            })
            .then(res => {
                let contentString = JSON.stringify(res.properties)
                return result = {
                    properties: contentString,
                    status: res.status
                }
            })
          
        }catch(e){
            console.error(e)
        }
        return result
    },
    /* 
    Analyzes an api and its attributes. Then creates a list from the attributes it found and their type. 
    This list is then returned as an array containing objects. 
        Input: 
            data: 1 result object from the fetched API 

        Output:   
            properties: {
                attribute_name: String
                attribute_type: String
            }[]
        
    */
    formatProperties(data){
        if(!undefined) {
            let properties = Object.keys(data);
            let test = Object.values(data)
            let formattedProperties = [];

            properties.forEach(prop => {
                formattedProperties.push({
                    attribute_name: prop,
                    attribute_type: this.getPropertyType(test[properties.indexOf(prop)])
                })
            })
            return formattedProperties;
        }else {
            return "error" 
        }
        
    },

    /*
    This function analyzes 1 property and returns it's type. 
        Input: 
            prop: any
        Output: 
            propType: String

        TODO: Add more possible outputs
    */
    getPropertyType(prop) {

        let propType = null
        switch (typeof prop) {
            case 'string':
                propType = "String"
                break;
            case 'number':
                propType = "Number"
                break;
            case 'boolean':
                propType = "Array"
                break;
            case 'object':
                propType = "Object"
                break;
            default:
                propType = "Undefined"
                break;
        }
        return propType;
    },

    /*
    This function checks if the input is either an array or an object of any kind. Returns boolean.
        Input:
            data: object or array
        Output: 
            boolean
    */
    detectIsArray(data) {
        if(Array.isArray(data)) {
            return true
        }
        else {
            return false
        }
    },

    /*
    paginate function takes the data model and returns a paginated version with the set limit that is passed through the url of the GET request.
    Used as middleware for the GET /apis request
    */
    paginate(data, page, limit) {
        let currentPage = parseInt(page);
        let resultLimit = parseInt(limit);
        let start = (currentPage - 1) * resultLimit;
        let end = currentPage * resultLimit;

        let result = {};

        if (end < data.length) {
            result.nextPage = {
                page: currentPage + 1,
                limit: resultLimit
            }
        }
        if (start > 0) {
            result.previousPage = {
                page: currentPage - 1,
                limit: resultLimit
            }
        }
        
        result.results = data.slice(start, end);
        paginatedResult = result;

        return paginatedResult
    }
}

module.exports = ApiHelpers;


