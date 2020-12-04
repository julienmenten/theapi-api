const express = require('express');
const http = require('http');
const app = express();

app.get('/test', (req, res) => {
   res.status(200).send()
});


module.exports = app;