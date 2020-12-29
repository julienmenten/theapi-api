# The great API API
## v1.1.0

The great API API is an API that allows users to find, test and share API's. 
With The great API, you can find API's for your project in seconds with all the usefull information and endpoints you need for development. 

---
## Why make an API API?
This project is a school project first, but a great tool nonetheless. Sometimes we look for API's, but not finding what we are looking for can be frustrating. 

---
## Getting started
1. Clone this repository.
2. Change directory to the api folder and install dependancies 
    ``` 
    cd api 
    npm install
    ```
3. Start up the server
    ```
    npm start
    ```
4. (TODO: Add info about postgreSQL server)
---
## How it works
The Great API has multiple endpoints to use. 

- `GET /apis`
    - Retrieves all the entries from the database
    - Has pagination
        - example request:  `GET /apis?page=1&limit=5`

- `GET /apis/:uuid`
    - Retrieves the entry where the uuid matches the provided uuid

- `POST /apis`
  - Inserts a new entry in the database
  - Body: 
    ``` 
        api_name: String
        api_url: String
        allowed_endpoints: String[]
        description: String
    ```



- `PATCH /apis/:uuid`
  - Edit **one** or **multiple** properties from a previous entry that matches the provided uuid
  - You don't have to provide all the other properties in the body, only the ones you wish to update
  - Example: 
    ```
    patchBody = {
        api_name: "New api name",
        description: "this description has been updated"
    }

    ```

- `DELETE /apis/:uuid`
  - Removes the entry from the database that matches the provided uuid
---
## Status & Roadmap

In development.

---
## Author 

Julien Menten

---
## Having trouble? 

Check out the contributing guidelines for reporting issues or setting up the development environment. 

---
