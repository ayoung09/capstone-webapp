import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  scores: state.drawkwardScoreboard.scores,
});

const mapDispatchToProps = dispatch => ({

});

const DrawkwardScoreboard = ({scores}) => {
  return (
    <div>
    </div>
  );
}
