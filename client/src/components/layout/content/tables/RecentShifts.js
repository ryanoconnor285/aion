import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clockOut, getOpenShifts } from '../../../../actions/shiftActions';
import Moment from 'react-moment';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const styles = theme => ({
  table: {
    minWidth: 375,
  },
  tableRow: {
    margin: 0,
    padding: 0
  }
});

class RecentShifts extends React.Component {
  constructor() {
    super();
    this.state = {
      clockOutDesc: '',
    }
  }

  handleClockOut = (id) => {

    const clockOutData = {
      clockOutDesc: this.state.clockOutDesc,
      id: id
    };
    this.props.clockOut(clockOutData);
    this.props.getOpenShifts();
  }

  render() {
    const { workShifts, classes } = this.props;
    const dateFormat = "MM/DD HH:mm";
    const workShift = workShifts.map(workshift =>
      <TableRow class={classes.tableRow} key={workshift._id} id={workshift._id}>
        <TableCell>
          <Moment format={dateFormat}>
            {workshift.clockIn}
          </Moment>
        </TableCell>
        <TableCell>
          {workshift.clockInDesc}
        </TableCell>
        <TableCell>
          {
            workshift.clockOut 
            ?
            <Moment format={dateFormat}>{workshift.clockOut}</Moment>
            :
            <Button onClick={() => this.handleClockOut(workshift._id)}>
              Clock Out
            </Button>
          }
        </TableCell>
        <TableCell>
          {workshift.clockOutDesc}
        </TableCell>
        <TableCell>
          {
            workshift.clockOut 
            ?
            moment(workshift.clockOut).diff(moment(workshift.clockIn), 'hours', true).toFixed(1) + ' hrs'
            :
            workshift.clockOut
          }
        </TableCell>
      </TableRow>
    )

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Clock In</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Clock Out</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {workShift}
        </TableBody>
      </Table>
    )
  }
}

RecentShifts.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  clockOut: PropTypes.func.isRequired,
  getOpenShifts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});

export default connect(mapStateToProps, { clockOut, getOpenShifts })(withStyles(styles)(RecentShifts));
