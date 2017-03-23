'use strict';

const db = require('APP/db');
const Wordbank = db.model('wordbank');

module.exports = require('express').Router()

  .get('/', (req, res, next) =>
    Wordbank.findAll()
    .then(words => res.json(words))
    .catch(next))
