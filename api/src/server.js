const express = require('express');
const http = require('http');
const bodyparser = require('body-parser')
const app = express();
const fetch = require('node-fetch');
const { json } = require('body-parser');
const {v4: uuidv4} = require('uuid')

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

  TODO (optional): Add pagination
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
app.post('/apis' , (req, res) => {

    if(req.body != undefined) {
        const newAPI = {
            uuid: uuidv4(),
            api_name: req.body.api_name,
            api_url: req.body.api_url,
            allowed_endpoints: req.body. allowed_endpoints,
            description: req.body.description
        }

        insertAPI(newAPI);
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

/*
 =================================================================
        FUNCTIONS MANIPULATING DATA
 =================================================================
*/

/* 
Fetches the API provided at POST and uses that data to find the 
    Input: 
        URL: string
*/
async function fetchNewAPIData(URL) {
    try{
        await fetch(URL, {method: 'GET'})
        .then(res => {
            let apiContent = res.json();
            console.log(apiContent)
            return  apiContent;
        })
    }catch(e){
        console.log(e)
    }
}
/* 
Analyzes a record and its attributes. Then creates a list from the attributes it found and their type. 
This list is then returned as an array containing objects. 
    Input: 
        data: 1 result object from the fetched API 

    Output:   
        attribute: {
            attribute_name: String
            attribute_type: String
        }[]
    
*/
function formatProperties(data){

}

/*
    InsertAPI() function accepts an object with data comming from the POST request and inserts the new API record to the database.
    This function also searches for the properties from the API makes a readable JSON format to put in the database. 

    TODO: READ THE API AND FORMAT THE PROPERTIES IN A JSON FORMAT THAT IS READABLE FOR FRONT END USE.
*/ 
async function insertAPI(data){
    await pg('api').insert({
        uuid: data.uuid,
        api_name: data.api_name,
        api_url: data.api_url,
        properties: {},
        endpoints: {"endpoints":data.allowed_endpoints},
        description: data.description
    }).returning('*').then(newData => {
        console.log(`New API added! Welcome ${newData[0].api_name}`)
    })
}

/*
 =================================================================
        FUNCTIONS MANIPULATING THE DATABASE
 =================================================================
*/
/*
For PostgreSQL, due to incompatibility between native array and json types, 
when setting an array (or a value that could be an array) as the value of a json or jsonb column, 
you should use JSON.stringify() to convert your value to a string prior to passing it to the query builder, e.g.

    knex.table('users')
    .where({id: 1})
    .update({json_data: JSON.stringify(mightBeAnArray)});
*/

/*
    Checks the database and it's tables. In case an 'api' table does not exist, it creates a new table that follows the knex schema. 
    This knex schema contains; 
        - id (increment): int
        - uuid: uuid
        - api_name: String
        - api_url: String
        - description: String
        - properties: String[]
        - endpoints: json
        - timestamps: Timestamps
*/

async function initialiseTables() {
  await pg.schema.hasTable('api').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('api', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('api_name');
          table.string('api_url');
          table.string('description');
          table.json('properties')
          table.json('endpoints')
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table: APIS');
        });

    } else {
        console.log('API table already exists')
    }
  });
}


/* 
    ResetTables function resets the table in case a column has been changed, added or removed. 
    ! ONLY USE WHEN A RESET OF THE TABLE IS NEEDED
*/
async function resetTables(){
    await pg.schema.dropTableIfExists('api');
}

/*
    Table functions
*/
initialiseTables()

module.exports = app;