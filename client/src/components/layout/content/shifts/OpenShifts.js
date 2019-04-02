import React from 'react';
import ClockOutModal from './ClockOutModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { clockOut, getOpenShifts } from '../../../../actions/shiftActions';
import moment from 'moment';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
});

class OpenShift extends React.Component {
  constructor() {
    super();
    this.state = {
      openShifts: [],
    }
  }

  render() {
    const { openShifts, classes } = this.props;
    const shiftList = 
      openShifts
       .map(openShift => 
           <SnackbarContent 
           key={openShift._id} 
           id={openShift._id}
           className={classes.snackbar} 
           message={moment(openShift.clockIn).calendar(null, {
             sameDay: '[You clocked in today at ] LT',
             lastDay: '[You clocked in yesterday at ] LT', 
             sameElse: '[You clocked in on] MM/DD/YYYY [at] LT',
             lastWeek: '[You clocked in on] MM/DD/YYYY [at] LT',
           })} 
           action={<ClockOutModal btnText={"Ready to clock out?"} shiftId={openShift._id} />} 
           />
        );
    
    return (
      <div>
        {shiftList}
      </div>
    );
  }
}

OpenShift.propTypes = {
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

export default connect(mapStateToProps, { clockOut, getOpenShifts })(withStyles(styles)(OpenShift));