import React from 'react';
import ClockOutModal from '../shifts/ClockOutModal';
import EditShiftModal from '../shifts/EditShiftModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../../../validation/isEmpty';
import CircularProgress from '../../../common/CircularProgress';
import { getOpenShifts, getShifts } from '../../../../actions/shiftActions';
import Moment from 'react-moment';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


const styles = theme => ({
  tableContainer: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    modal: {
      [theme.breakpoints.down('sm')]: {
        width: '370 px'
      },
      [theme.breakpoints.up('md')]: {
        width: theme.spacing.unit * 50,
      },
    },
  },
});

class RecentShifts extends React.Component {
  constructor() {
    super();
    this.state = {
      clockOutDesc: '',
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.workShift) {
      this.setState({ workShift: nextProps.workShift });
    }
  }

  render() {
    const { workShifts, loading, classes } = this.props;
    const dateFormat = "MM/DD HH:mm";
    let workShiftTable;
    if (loading) {
      workShiftTable = <CircularProgress />;
    } else if (isEmpty(workShifts)) {
      workShiftTable = <span>No shifts to display yet</span>
    } else {
      workShiftTable = 
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
          {workShifts.map(workshift =>
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
                  <ClockOutModal btnText={"Clock Out"} id={workshift._id} />
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
              <TableCell>
                <EditShiftModal
                  id={workshift._id}
                  workshift={workshift}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    }

    return (
      <Paper className={classes.tableContainer}>
        {workShiftTable}
      </Paper>
    )
  }
}

RecentShifts.propTypes = {
  auth: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getShifts: PropTypes.func.isRequired,
  getOpenShifts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  workShift: state.workShift
});

export default connect(mapStateToProps, { getShifts, getOpenShifts })(withStyles(styles)(RecentShifts));

