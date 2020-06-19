require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./conf')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.json({ message: 'Bienvenue sur Express' });
});

app.get('/users', (req, res) => {
  connection.query('SELECT * from Users', (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'No body was here..' })
      )
    }
    res.json(results);
  });
});

app.get('/users/comments', (req, res) => {
  connection.query('SELECT comment from Users', (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'No body was here..' })
      )
    }
    res.json(results);
  });
});


app.get('/users/comments/filter/', (req, res) => {
  const { query } = req
  if (query.content) {
    const queryContent = `%${query.content}%`
    connection.query('SELECT comment from Users WHERE comment LIKE ?', queryContent, (err, results) => {
      if (err) {
        return (
          res.status(500).json({ message: 'No body was here..' })
        )
      }
      res.json(results);
    });
  }
  if (query.date) {
    const queryDate =`${query.date} 00:00:00`
    connection.query('SELECT comment from Users WHERE date > ?', queryDate, (err, results) => {
      if (err) {
        return (
          res.status(500).json({ message: 'No body was here..' })
        )
      }
      res.json(results);
    });
  }
});

module.exports = app; 
