const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(zooIds => {
      res.status(201).json(zooIds);
    })
    .catch(error => {
      res.status(500).json({
        "error": "Could not add Zoo. Make sure to use a unique name and try again."
      });
    });
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
