const fetch = require('node-fetch');
const { json } = require('body-parser');
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
*/
    async fetchNewAPIData(URL) {
        try{
            await fetch(URL, {method: 'GET'})
            .then(res => {
                let apiContent = res.json();
                return {
                    "status": res.status,
                    "content": res
                };
            })
        }catch(e){
            console.log(e)
        }
    },
/* 
Analyzes an api and its attributes. Then creates a list from the attributes it found and their type. 
This list is then returned as an array containing objects. 
    Input: 
        data: 1 result object from the fetched API 

    Output:   
        attribute: {
            attribute_name: String
            attribute_type: String
        }[]
    
*/
    formatProperties(data){

    },
 
}

module.exports = ApiHelpers;


