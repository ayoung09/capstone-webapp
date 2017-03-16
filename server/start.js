'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const socketio = require('socket.io');

const app = express();

const server = app.listen(1337, () => {
    console.log('--- The server is listening intently on PORT 1337 ---');
  });

const io = socketio(server);

io.on('connection', socket => {
  console.log('A new user has connected: ', socket.id);

  socket.on('sendCoordinatesFromIOS', data => {
    console.log('server has received data: ', data);
    socket.broadcast.emit('receiveCoordinatesFromIOS', {id: socket.id, data: data});
  });

  socket.on('talk to mobile', socketId => {
    console.log('received message from webapp', socketId);
    socket.broadcast.emit('message from webapp', socketId);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected :(');
  });
});

  app
    .use(require('volleyball'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  .use(express.static(resolve(__dirname, '..', 'public')))
  .use(express.static('./public/css/'))

  .use('/api', require('./api'))

  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  .use((err, req, res, next) => {
    console.log('Problem at the start');
    res.status(500).send(err);
    next();
  });

module.exports = app;
