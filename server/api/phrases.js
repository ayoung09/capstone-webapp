'use strict';

const db = require('APP/db');
const Phrase = db.model('phrases');

module.exports = require('express').Router()

  .get('/', (req, res, next) =>
    Phrase.findAll({ where: req.query })
    .then(phrases => res.json(phrases))
    .catch(next))
