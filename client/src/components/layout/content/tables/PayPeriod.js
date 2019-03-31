import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getShifts } from '../../../../actions/shiftActions';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import ShiftsTable from './ShiftsTable';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
});

class PayPeriod extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  
  componentDidMount() {

  }

  render() {
    const { classes } = this.props;
    //This is the first know pay period start date, it is selected arbitrarily 
    const payPeriodStart = 1551502800000;
    let payPeriodsPast = Math.floor((moment().diff(payPeriodStart, 'days'))/14);
    let daysToAdd = ((payPeriodsPast + 1) * 14) - 1;
    let currentPayPeriodEnd = moment(payPeriodStart).add(daysToAdd, 'days').endOf("day");
    

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Today is {moment().format('MMMM Do YYYY, h:mm:ss a')} the current pay period ends on {currentPayPeriodEnd.format('dddd, MMMM Do YYYY')}
            </Typography>
          </Toolbar>
        </AppBar>
        <ShiftsTable />
      </div>
    );
  }
}

PayPeriod.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getShifts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});

export default connect(mapStateToProps, { getShifts })(withStyles(styles)(PayPeriod));
