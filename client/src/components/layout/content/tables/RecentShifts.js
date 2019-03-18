import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clockOut, getOpenShifts } from '../../../../actions/shiftActions';
import Moment from 'react-moment';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
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
      <TableRow className={classes.tableRow} key={workshift._id} id={workshift._id}>
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
      <Paper className={classes.root}>
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
      </Paper>
    )
  }
}

RecentShifts.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clockOut: PropTypes.func.isRequired,
  getOpenShifts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});

export default connect(mapStateToProps, { clockOut, getOpenShifts })(withStyles(styles)(RecentShifts));
