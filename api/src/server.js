const express = require('express');
const http = require('http');
const bodyparser = require('body-parser')
const app = express();
const fetch = require('node-fetch')


const pg = require('knex')({
    client: 'pg',
    version: '9.6',      
    connection: 'postgres://julien:admin12345@localhost:5432/thegreatapi',
    searchPath: ['knex', 'public'],
  });


// GET all API's 

app.get('/apis', (req, res) => {
   res.status(200).send()
});

// FIND ONE API 
app.get('apis/:uuid', async (req, res) => {

    const uuid = req.params.uuid;

    const result = await pg
        .select(['uuid', 'api_name', 'created_at'])
        .from('api')
        .where({uuid: uuid})

    res.json({
        res: result
    });
});


/* POST request for a new API 
        Accepts:
            API-name: String
            API-link: String
            Allowed-endpoints: String[]
            Description: String
*/
app.post('/apis' , (req, res) => {

    const newAPI = {
        api_name: req.body.name,
        api_url: req.body.url,
        allowed_endpoints: req.body.permissions,
        description: req.body.description
    }


})

// DELETE request of an API
app.delete('/apis/:uuid', (req, res) => {

})

// UPDATE request of an API
 

/* Fetch the info of the new API 
    Accepts: 
        URL: string
*/

async function fetchNewAPIData(URL) {
    try{
        await fetch(URL, {method: 'GET'})
        .then(res => {
            let apiContent = res.json();
            return  apiContent;
        })
        .then(json => {
            console.log(json)
        })
    }catch(e){
        console.log(e)
    }
   
}

// Initializing the API table

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
        - an increment: int
        - an uuid: uuid
        - a name: String
        - properties: json
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
          table.string('api_link');
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

initialiseTables()

module.exports = app;