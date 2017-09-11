import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { component as Metronome } from './Metronome';
import { debug } from '../utils';
import * as actions from './actions';
import HeadMenu from './components/HeadMenu';

const mapStateToProps = state => ({
  general: state.general
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

class Containers extends React.Component {
  componentDidMount() {
    this.props.actions.updateWindowDime();
    window.addEventListener('resize', this.props.actions.updateWindowDime);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.props.actions.updateWindowDime);
  }
  render() {
    return (
      <div>
        <HeadMenu />
        <button
          className="ui button"
          onClick={this.props.actions.hi}
        >
          Click2
        </button>
        <Link to="/metronome">Click</Link>
        <Switch>
          <Route
            path={`${this.props.match.url}metronome`}
            component={Metronome}
          />
        </Switch>
      </div>
    )
  }
};

Containers.protTypes = {
  general: PropTypes.object,
  actions: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Containers);
