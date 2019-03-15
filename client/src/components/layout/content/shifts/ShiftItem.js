import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ShiftItem extends React.Component {
  render() {
    const { workShifts } = this.props;
    return(
      <div>
        <h1>Shift Item</h1>
        <h3>{workShifts.user}</h3>
        <h3>{workShifts.clockIn}</h3>
        <h3>{workShifts.clockInDesc}</h3>
        <h3>{workShifts.clockOut}</h3>
        <h3>{workShifts.clockOutDesc}</h3>
      </div>
    )
  }
}

ShiftItem.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(ShiftItem);
