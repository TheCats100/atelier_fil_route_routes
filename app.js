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
    const queryDate = `${query.date} 00:00:00`
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

app.get('/users/date/:order', (req, res) => {
  const { order } = req.params
  if (order === 'asc') {
    connection.query('SELECT * from Users ORDER BY date asc', order, (err, results) => {
      console.log(err)
      if (err) {
        return (
          res.status(500).json({ message: 'No body was here..' })
        )
      }
      res.json(results);
    });
  }
  if (order === 'desc') {
    connection.query('SELECT * from Users ORDER BY date desc', order, (err, results) => {
      console.log(err)
      if (err) {
        return (
          res.status(500).json({ message: 'No body was here..' })
        )
      }
      res.json(results);
    });
  }
});

app.post('/users', (req, res) => {
  const formData = req.body
  if (formData.comment == null || formData.date == null || formData.connected == null) {
    return (
      res.status(400).json({message: "Necessary fields are empty"})
    )
  }
  connection.query('INSERT INTO Users SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: "Erreur lors de la sauvegarde d'un users"})
      )
    }
    res.status(201).json({ ...formData, id: results.insertId })
  });
});

app.put('/users/:id/bool', (req, res) => {
  const formData = req.body
  const { id } = req.params
  connection.query('UPDATE Users SET ? WHERE id = ?', [formData, id], (err, results) => {
    if (err) {
      return (
        res.status(500).json({message: "Erreur lors de la sauvegarde d'un users"})
      )
    }
    res.status(200).json({message: `Changed row ${results.changedRows}`});
  });
});

module.exports = app; 
