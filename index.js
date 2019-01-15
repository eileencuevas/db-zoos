const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .then(zoo => {
      if (zoo.length > 0) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'No zoo found with that id.' })
      }
    })
    .catch(() => {
      res.status(500).json({
        "error": "Could not retrieve any Zoos. Please try again."
      })
    });
})

server.get('/api/zoos/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(() => {
      res.status(500).json({
        "error": "Could not retrieve any Zoos. Please try again."
      })
    });
})

server.post('/api/zoos', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(zooIds => {
      res.status(201).json(zooIds);
    })
    .catch(() => {
      res.status(500).json({
        "error": "Could not add Zoo. Make sure to use a unique name and try again."
      });
    });
})

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'No zoo found with that id.' });
      }
    })
    .catch(() => {
      res.status(500).json({
        "error": "Could not delete any Zoos. Please try again."
      });
    });
})

server.put('/api/zoos/:id', (req, res) => {
  const newName = req.body;

  db('zoos')
    .where({ id: req.params.id })
    .update(newName)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'No zoo found with that id.' });
      }
    })
    .catch(() => {
      res.status(500).json({
        "error": "Could not update any Zoos. Please try again."
      });
    });
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
