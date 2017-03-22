'use strict'

const db = require('APP/db');
const User = db.model('users');

module.exports = require('express').Router()

  .get('/', (req, res, next) =>
                          //spacing :)
       User.findAll({ where: req. query })
       .then(users => res.json(users))
       .catch(next))
