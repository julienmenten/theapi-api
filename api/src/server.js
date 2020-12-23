const express = require('express');
const http = require('http');
const bodyparser = require('body-parser')
const app = express();
const { json } = require('body-parser');
const {v4: uuidv4} = require('uuid')
const DatabaseHelper = require('./helpers/DatabaseHelper');
const ApiHelpers = require('./helpers/apiHelpers');
/*
 */
const pg = require('knex')({
    client: 'pg',
    version: '9.6',      
    connection: 'postgres://julien:admin12345@localhost:5432/thegreatapi',
    searchPath: ['knex', 'public'],
  });



// Middelware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extented: true}))

/*
 =================================================================
            API ENDPOINTS
 =================================================================
*/
/*
GET /apis
  Gets all the records from the 'api' Database

  TODO (optional): Add pagination: https://medium.com/learnfactory-nigeria/create-a-pagination-middleware-with-node-js-fe4ec5dca80f
*/
app.get('/apis', async (req, res) => {
    let apiList = []
    await pg('api').select('*').then( apis => {
        apis.forEach( api => {
            apiList.push(api)
        })
    })
    res.status(200).send(apiList)
});


/*
GET /apis/:uuid
    Finds the API in the databse that matches the provided UUID
*/
app.get('/apis/:id', async (req, res) => {
    console.log
    const uuid = req.params.id;

    const result = await pg('api')
        .select('*')
        .where({uuid: uuid})

    if(result.length >= 1) {
        res.status(200).send({
            result: result
        });
    }else {
        res.status(400).send("API not found")
    }
    
});


/* 
POST /apis
    Adds a new API to the database.
    The body of the request must contain:
        API-name: String
        API-link: String
        Allowed-endpoints: String[]
        Description: String
    
    TODO: Add security in case the request does not have the required inputs
*/
app.post('/apis' , async (req, res) => {

    if(req.body != undefined) {
        let api_properties = await ApiHelpers.fetchNewAPIData(req.body.api_url);
        let formattedProperties = ApiHelpers.formatProperties(JSON.parse(api_properties.properties));
        const newAPI = {
            uuid: uuidv4(),
            api_name: req.body.api_name,
            api_url: req.body.api_url,
            properties: formattedProperties,
            allowed_endpoints: req.body.allowed_endpoints,
            description: req.body.description
        }
        
        DatabaseHelper.insertAPI(newAPI);
        res.status(200).send({
            "status": 200,
            "message": "Record added!",
            "id": newAPI.uuid,
            "api": newAPI
        })
    } else {
       res.status(400).send("Invalid body received")
    }
   
})

/* 
DELETE /apis/:uuid
    Deletes a record from the database that matches the provided UUID
*/
app.delete('/apis/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        await pg('api').where({uuid: uuid}).del().returning('*').then(data => {
            console.log(`API deleted! Goodbye`)
            res.status(200).send()
        })
        
    }catch(e){
        console.log(e)
        res.status(400).send("An unknown error has occured")
    }
    
})

/* 
PATCH /apis/:uuid
   Updates the content of a specific API that matches the provided UUID. 
   The body can be any attributes from the original object: 
        API-name: String
        API-link: String
        Allowed-endpoints: String[]
        Description: String

        TODO: Secure the endpoint so that you get error messages 
*/

app.patch('/apis/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const newBody = req.body
    try{    
        await pg('api').where({uuid: uuid}).update(newBody).returning('*').then(data => {
            res.status(200).send()
        })
    }  catch(e) {
        res.status(400).send()
    }
})


app.get('/teapot', (req, res) => {
    res.status(418).send()
})


/*
    Table functions
*/
DatabaseHelper.initialiseTables()

module.exports = app;