require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port || 8000;
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.json({ message: 'Bienvenue sur Express' });
});

module.exports = app; 
