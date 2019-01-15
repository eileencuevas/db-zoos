const express = require('express');
const knex = require('knex');
const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);
const router = express.Router();

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

module.exports = router;