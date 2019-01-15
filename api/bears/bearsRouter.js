const express = require('express');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);
const router = express.Router();

router.get('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .then(bear => {
            if (bear.length > 0) {
                res.status(200).json(bear);
            } else {
                res.status(404).json({ message: 'No bear found with that id.' });
            }
        })
        .catch(() => {
            res.status(500).json({
                "error": "Could not retrieve any Bears. Please try again."
            })
        });
})

router.get('/', (req, res) => {
    db('bears')
        .then(bears => {
            res.status(200).json(bears);
        })
        .catch(() => {
            res.status(500).json({
                "error": "Could not retrieve any Bears. Please try again."
            })
        });
})

router.post('/', (req, res) => {
    db('bears')
        .insert(req.body)
        .then(bearIds => {
            res.status(201).json(bearIds);
        })
        .catch(() => {
            res.status(500).json({
                "error": "Could not add Bear. Make sure to use a unique name and try again."
            });
        });
})

router.delete('/:id', (req, res) => {
    db('bears')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: 'No bear found with that id.' });
            }
        })
        .catch(() => {
            res.status(500).json({
                "error": "Could not add Bear. Make sure to use a unique name and try again."
            });
        });
})

module.exports = router;