import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clockOut } from '../../../../actions/shiftActions';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
      id: this.props.id
    };
    console.log(clockOutData);
    this.props.clockOut(clockOutData);
    this.setState({ clockInDesc: '' });
  }

  render() {
    const { workShifts } = this.props;
    return(
      <TableRow key={workShifts.id}>
        <TableCell>{workShifts.clockIn}</TableCell>
        <TableCell>{workShifts.clockInDesc}</TableCell>
        <TableCell>{workShifts.clockOut ? workShifts.clockOut : <Button onClick={this.handleClockOut}>Clock Out</Button>}</TableCell>
        <TableCell>{workShifts.clockOutDesc}</TableCell>
      </TableRow>
    )
  }
}

ShiftItem.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  clockOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});

export default connect(mapStateToProps, {clockOut})(ShiftItem);
