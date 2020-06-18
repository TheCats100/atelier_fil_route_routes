require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.json({message: 'Bienvenue sur Express'} );
});

module.exports = app; 
