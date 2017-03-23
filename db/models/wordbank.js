'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const Wordbank = db.define('wordbank', {
  text: Sequelize.STRING
});

module.exports = Wordbank
