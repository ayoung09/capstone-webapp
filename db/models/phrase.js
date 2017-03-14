'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const Phrase = db.define('phrases', {
  text: Sequelize.STRING,
});

module.exports = Phrase;
