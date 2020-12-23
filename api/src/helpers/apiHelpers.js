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
        let result 
        try{
            await fetch(URL)
            .then(async data => {
                content = await data.json()

                return {
                // TODO: Check if the content of the API is an array or a simple JSON
                   content: content,
                   status: data.status
                }
            })
            .then(res => {
                let contentString = JSON.stringify(res.content)
                return result = {
                    content: contentString,
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
        let properties = Object.keys(data)
        let newProperties = [];
        properties.forEach(prop => {
            newProperties.push({
                attribute_name: prop
            })
        })
        console.log(newProperties)
        return properties;
    },
 
}

module.exports = ApiHelpers;


