import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getShifts } from '../../../actions/shiftActions';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from '../../../validation/isEmpty';
import ClockInModal from './shifts/ClockInModal';
import OpenShifts from './shifts/OpenShifts';
import ShiftInfoTabs from './ShiftInfoTabs';
import { Grid, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class EditShifts extends Component {
  constructor() {
    super();
    this.state = {
      openShifts: [],
      isAuthenticated: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getShifts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
    if (newProps.workShift.openShifts) {
      this.setState({ openShifts: newProps.openShifts });
    }
  }

  render() {
    const { workShift, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6} md={3}>
            {
              isEmpty(workShift.openShifts)
                ?
                null
                :
                <Paper className={classes.paper}>
                  <OpenShifts openShifts={workShift.openShifts} />
                </Paper>
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <ClockInModal />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ShiftInfoTabs workShifts={workShift.workShifts} openShifts={workShift.openShifts} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditShifts.propTypes = {
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

export default connect(mapStateToProps, { getShifts })(withStyles(styles)(EditShifts));
