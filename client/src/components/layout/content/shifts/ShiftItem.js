import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clockOut } from '../../../../actions/shiftActions';
import Moment from 'react-moment';
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
    this.props.clockOut(clockOutData);
    this.setState({ clockInDesc: '' });
  }

  render() {
    const { workShifts } = this.props;
    const dateFormat = "MM/DD HH:mm";

    return(
      <TableRow key={workShifts.id}>
        <TableCell>
          <Moment format={dateFormat}>
            {workShifts.clockIn}
          </Moment>
        </TableCell>
        <TableCell>
          {workShifts.clockInDesc}
        </TableCell>
        <TableCell>
          {workShifts.clockOut ?
            <Moment format={dateFormat}>{workShifts.clockOut}</Moment>   
            : 
            <Button onClick={this.handleClockOut}>Clock Out</Button>} 
        </TableCell>
        <TableCell>
          {workShifts.clockOutDesc}
        </TableCell>
        <TableCell>
          {workShifts.clockOut ?
            <Moment diff={workShifts.clockIn} unit="hours" decimal>{workShifts.clockOut}</Moment>
            :
            workShifts.clockOut}
        </TableCell>
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
