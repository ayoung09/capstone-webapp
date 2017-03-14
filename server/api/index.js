'use strict';

const db = require('APP/db');
const api = module.exports = require('express').Router();

api
  .use('/users', require('./users'))

api.use((req, res) => res.status(404).end());
