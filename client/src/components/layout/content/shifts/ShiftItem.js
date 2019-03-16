import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class ShiftItem extends React.Component {
  constructor() {
    super();
    this.state = {
      clockOutDesc: '',
    }
  }

  handleClockOut = (e) => {
    e.preventDefault();

    const clockOutData = {
      clockOutDesc: this.state.clockOutDesc,
      id: e.target.id
    };
    console.log(clockOutData);
    this.props.clockOut(clockOutData);
    this.setState({ clockInDesc: '' });
  }
  render() {
    const { workShifts } = this.props;
    return(
      <div>
        <h3>Shift Item</h3>
        <h5>{workShifts.user}</h5>
        <h5>{workShifts.clockIn}</h5>
        <h5>{workShifts.clockInDesc}</h5>
        <h5>{workShifts.clockOut ? workShifts.clockOut : <Button onClick={this.handleClockOut}>Clock Out</Button>}</h5>
        <h5>{workShifts.clockOutDesc}</h5>
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
