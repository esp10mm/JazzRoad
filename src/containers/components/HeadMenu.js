import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { debug } from '../../utils';

const mapStateToProps = state => ({
  general: state.general
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

class HeadMenu extends React.Component {
  componentDidUpdate() {
    const width = this.props.general.get('width');
    if (this.dropdown) {
      $(this.dropdown).dropdown();
    }
  }
  render() {
    const width = this.props.general.get('width');
    if (width < 400) {
      return (
        <div className="ui top fixed menu">
          <div
            className="ui dropdown icon item"
            ref={(c) => { this.dropdown = c; }}
          >
            <i className="sidebar icon" />
            <div className="menu">
              <Link
                className="item"
                to="/metronome"
              >
                Metronome
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="ui top fixed menu">
        <Link
          className="item"
          to="/metronome"
        >
          Metronome
        </Link>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadMenu);
