'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const socketio = require('socket.io');
const { newRoom, newUser, newDrawing, newGuess, receiveNewUser, receiveNewDrawing, receiveNewGuess, sendStartGame, sendRandomPhrase, receiveRandomPhrase, selectPhrase, receivedSelectedPhrase } = require('../socketConstants');


const app = express();

const server = app.listen(1337, () => {
    console.log('--- The server is listening intently on PORT 1337 ---');
  });

const io = socketio(server);

io.on('connection', socket => {
  console.log('A new user has connected: ', socket.id);
  console.log('this is newRoom: ', newRoom);

  //mobile joins room; come back to this when ready to incorporate rooms...
  socket.on(newRoom, data => {
    socket.join(data.room);
  });

  //mobile sends username and portrait
  socket.on(newUser, userObj => {
    socket.broadcast.emit(receiveNewUser, {
      id: socket.id,
      userObj: userObj,
    });
  });

  //mobile starts gameplay
  socket.on(sendStartGame, () => {
    socket.broadcast.emit(startGame);
  });

  //webapp starts game and sends phrases
  socket.on(sendRandomPhrase, data => { //data is {randomPhrases, userIds}
    data.userIds.forEach(userId => {
      let phraseString = data.randomPhrases.shift().text;
      io.clients[userId].emit(receiveRandomPhrase, phraseString);
    });
  });

  //mobile sends new drawing
  socket.on(newDrawing, drawingObj => {
    socket.broadcast.emit(receiveNewDrawing, {
      id: socket.id,
      drawingObj: drawingObj,
    });
  });

  //mobile sends new phrase guess
  socket.on(newGuess, guessString => {
    socket.broadcast.emit(receiveNewGuess, {
      id: socket.id,
      guessString: guessString,
    });
  });

  //mobile selects a phrase from group's captions
  socket.on(selectPhrase, guess => {
    socket.broadcast.emit(receivedSelectedPhrase, {
      id: socket.id,
      selectedPhrase: guess
    });
  });

  socket.on('sendCoordinatesFromIOS', data => {
    console.log('server has received data: ', data);
    socket.broadcast.emit('receiveCoordinatesFromIOS', {id: socket.id, data});
  });

  //TEST CONNECTION FROM BROWSER TO MOBILE
  socket.on('talk to mobile', socketId => {
    console.log('received message from webapp', socketId);
    socket.broadcast.emit('message from webapp', socketId);
  });

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
