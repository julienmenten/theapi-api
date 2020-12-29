
/*
 =================================================================
        FUNCTIONS MANIPULATING THE DATABASE
 =================================================================
*/
const pg = require('knex')({
    client: 'pg',
    version: '9.6',      
    connection: 'postgres://julien:admin12345@localhost:5432/thegreatapi',
    searchPath: ['knex', 'public'],
  });

const DatabaseHelper = {
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
    async initialiseTables() {
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
              }).then( (res) => {
                    console.log(res)
                    console.log('created table: APIS');
              });
      
          } else {
              console.log('API table already exists')
          }
        });
      },


/* 
    ResetTables function resets the table in case a column has been changed, added or removed. 
    ! ONLY USE WHEN A RESET OF THE TABLE IS NEEDED
*/
    async resetTables(){
        await pg.schema.dropTableIfExists('api');
    },

    /*
    InsertAPI() function accepts an object with data comming from the POST request and inserts the new API record to the database.
    This function also searches for the properties from the API makes a readable JSON format to put in the database. 

    TODO: READ THE API AND FORMAT THE PROPERTIES IN A JSON FORMAT THAT IS READABLE FOR FRONT END USE.
*/ 
    async insertAPI(data){
        await pg('api').insert({
            uuid: data.uuid,
            api_name: data.api_name,
            api_url: data.api_url,
            properties: {"properties":data.properties},
            endpoints: {"endpoints":data.allowed_endpoints},
            description: data.description
        }).returning('*').then(newData => {
            console.log(`New API added! Welcome ${newData[0].api_name}`)
        })
    },
    
}

module.exports = DatabaseHelper, pg;