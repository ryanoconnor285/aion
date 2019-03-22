import React from 'react';
import ClockOutModal from './ClockOutModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { clockOut, getOpenShifts } from '../../../../actions/shiftActions';
import Moment from 'react-moment';
import { List, ListItem, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
    const dateFormat = "LT on MM/DD";
    
    const shiftList = 
      openShifts
       .map(openShift => 
        <ListItem key={openShift._id} id={openShift._id}>
          <Typography color="textSecondary">
             You clocked in at <Moment format={dateFormat}>{openShift.clockIn}</Moment>. 
          </Typography>
           <ClockOutModal btnText={"Ready to clock out?"} id={openShift._id} />
        </ListItem>);
    
    return (
      <List component="nav" className={classes.root}>
        {shiftList}
      </List>
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