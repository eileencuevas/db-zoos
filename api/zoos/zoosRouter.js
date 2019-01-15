const express = require('express');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);
const router = express.Router();

router.get('/:id', (req, res) => {
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
  
router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
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

module.exports = router;