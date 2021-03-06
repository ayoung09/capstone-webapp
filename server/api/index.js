'use strict';

const db = require('APP/db');
const api = module.exports = require('express').Router();

api
  .use('/users', require('./users'))
  .use('/phrases', require('./phrases'))
  .use('/wordbank', require('./wordbank'))

api.use((req, res) => res.status(404).end());
