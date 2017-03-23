'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const socketio = require('socket.io');
const { newRoom, newUser, newDrawing, newGuess, receiveNewUser, receiveNewDrawing, receiveNewGuess, sendStartGame, startGame, sendRandomPhrase, receiveRandomPhrase, TIME_IS_UP, FORCE_SUBMIT_DRAWING, sendToArtist, youAreTheArtist, sendStartCaption, startCaption, receivedAllCaptions, phraseOptions, selectPhrase, receivedSelectedPhrase, nextDrawing, seeNextDrawing, scoreboard, lookAtScoreboard, sendGameOver, gameOver, NEW_TEAM, RECEIVE_NEW_TEAM, CORRECT_GUESS, SKIP, FETCH_NEXT_WORD, SEND_NEW_WORD, RECEIVE_NEW_WORD } = require('../socketConstants');


const app = express();

const server = app.listen(1337, () => {
    console.log('--- The server is listening intently on PORT 1337 ---');
  });

const io = socketio(server);

io.on('connection', socket => {
  console.log('A new user has connected: ', socket.id);
  console.log('this is newRoom: ', newRoom);

  //mobile joins room; come back to this when ready to incorporate rooms...
  // socket.on(newRoom, data => {
  //   socket.join(data.room);
  // });

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
      io.to(userId).emit(receiveRandomPhrase, phraseString);
    });
  });

  //mobile sends new drawing
  socket.on(newDrawing, drawingObj => {
    socket.broadcast.emit(receiveNewDrawing, {
      id: socket.id,
      drawingObj: drawingObj,
    });
  });

  //webapp forces mobile to submit drawing
  socket.on(TIME_IS_UP, () => {
    socket.broadcast.emit(FORCE_SUBMIT_DRAWING);
  });

  //webapp tells current artist (mobile) to wait
  socket.on(sendToArtist, (artistId) => {
    io.to(artistId).emit(youAreTheArtist);
  });

  //webapp tells mobile users (except artist) to start typing a caption
  socket.on(sendStartCaption, usersToReceive => {
    usersToReceive.forEach(user => {
      io.to(user).emit(startCaption);
    });
  });

  //mobile sends new phrase guess
  socket.on(newGuess, guessString => {
    socket.broadcast.emit(receiveNewGuess, {
      id: socket.id,
      guessString: guessString,
    });
  });

  //webapp sends caption selection options to users except the artist
  socket.on(receivedAllCaptions, ({usersToReceive, captionArray}) => {
    usersToReceive.forEach(user => {
      io.to(user).emit(phraseOptions, captionArray);
    });
  });

  //mobile selects a phrase from group's captions
  socket.on(selectPhrase, guessString => {
    socket.broadcast.emit(receivedSelectedPhrase, {
      id: socket.id,
      selectedPhrase: guessString,
    });
  });

  socket.on(lookAtScoreboard, () => {
    socket.broadcast.emit(scoreboard);
  });

  //mobile calls to see next drawing after scoreboard
  socket.on(nextDrawing, () => {
    socket.broadcast.emit(seeNextDrawing);
  });

  //webapp says game is over
  socket.on(sendGameOver, () => {
    socket.broadcast.emit(gameOver);
  });

  //pictionary

    //mobile sends team data
  socket.on(NEW_TEAM, teamData => {
    socket.broadcast.emit(RECEIVE_NEW_TEAM, {
      name: teamData.name,
      portrait: teamData.portrait,
    })
  })

  //mobile guesses correctly; requests new word
  socket.on(CORRECT_GUESS, () => {
    socket.broadcast.emit(FETCH_NEXT_WORD)
  })
 //mobile skips word; requests new word
  socket.on(SKIP, () => {
    socket.broadcast.emit(FETCH_NEXT_WORD)
  })

  //web app sends new word; server sends word to mobile
  socket.on(SEND_NEW_WORD, word => {
    socket.broadcast.emit(RECEIVE_NEW_WORD, word)
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
