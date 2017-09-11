import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { component as Metronome } from './Metronome';
import * as actions from './actions';

const mapStateToProps = state => ({
  general: state.general
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

class Containers extends React.Component {
  render() {
    return (
      <div>
        Containers
        <button
          className="ui button"
          onClick={this.props.actions.hi}
        >
          Click2
        </button>
        <Metronome />
      </div>
    )
  }
};

Containers.protTypes = {
  db: PropTypes.object,
  actions: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Containers);
