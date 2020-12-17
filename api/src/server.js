const express = require('express');
const http = require('http');
const bodyparser = require('body-parser')
const app = express();
const fetch = require('node-fetch')


const pg = require('knex')({
    client: 'pg',
    version: '9.6',      
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
  });


// GET all API's 
app.get('/api', (req, res) => {
   res.status(200).send()
});

// FIND ONE API 
app.get('api/:uuid', async (req, res) => {

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
            API-link: String
            Allowed-endpoints: TBD
*/
app.post('/apis' , (req, res) => {

    const newAPI = {
        url: req.body.url,
        permissions: req.body.permissions
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


async function initialiseTables() {
  await pg.schema.hasTable('api').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('api', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('api_name');
          table.json('properties')
          table.json('endpoints')
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table: APIS');
        });
        
    }
  });
}

initialiseTables()

module.exports = app;