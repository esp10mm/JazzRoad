import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debug } from '../../utils';
import * as actions from  './actions';
import { container } from './index';

const mapStateToProps = state => ({
  data: state.metronome,
  general: state.general
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

class Metronome extends React.Component {
  render() {
    return (
      <div>
        Metronome
        <div>
          general:
          {this.props.general.get('hi')}
        </div>
        <div>
          metronome:
          {this.props.data.get('hi')}
        </div>
        <button
          className="ui button"
          onClick={this.props.actions.hi}
        >
          Click
        </button>
      </div>
    )
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Metronome);

