import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  db: state
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
});

class Containers extends React.Component {
  render() {
    return (
      <div>
        Containers
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
