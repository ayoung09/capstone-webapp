'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');

const app = express();

module.exports = app

  .use(require('volleyball'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  .use(express.static(resolve(__dirname, '..', 'public')))
  .use(express.static('./public/css/'))

  //.use('/api', require('./api'))

  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  .use((err, req, res, next) => {
    console.log('Problem at the start');
    res.status(500).send(err);
    next();
  })

  .listen(1337, () => {
    console.log('--- The server is listening intently on PORT 1337 ---');
  });
