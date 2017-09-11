import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { component as Metronome } from './Metronome';
import { debug } from '../utils';
import * as actions from './actions';

const mapStateToProps = state => ({
  general: state.general
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

        // <Link to="/metronome"}>click</Link>
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
        <Link to="/metronome">Click</Link>
        <Route
          path={`${this.props.match.url}metronome`}
          render={() => (<Metronome />)}
        />
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
