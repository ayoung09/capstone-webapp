import React, { Component } from 'react';
import { connect } from 'react-redux';

import DrawkwardUserThumbnail from './DrawkwardUserThumbnail';

const mapStateToProps = state => ({
  users: state.drwkwardFrame.users,
  scores: state.drawkwardScoreboard.scores,
});

class DrawkwardWinner extends Component {
  render({users, scores}) {
    const findTopThreeWinners = (scoreboard) => {
      const socketIdArray = Object.keys(scoreboard);
      socketIdArray.sort((id1, id2) => {
        return scoreboard[id1] < scoreboard[id2];
      });
      return socketIdArray.slice(0, 3);
    };

    const topThree = findTopThreeWinners(scores);

    return (
      <div id="drawkward-winners">
        <h1>Winners!</h1>
        {topThree.map(socketId => {
          const nameToDisplay = users[socketId].username;
          const imageArray = users[socketId].portrait;
          let numOfPoints = scores[socketId];
          return (
            <div key={socketId} className="winner-thumbnail">
              <DrawkwardUserThumbnail
                userName={nameToDisplay}
                image={imageArray}
              />
              <h2>{numOfPoints} points</h2>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(DrawkwardWinner);
