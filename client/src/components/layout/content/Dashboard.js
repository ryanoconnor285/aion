import React, { Component } from 'react';
import ShiftItem from './shifts/ShiftItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getShifts, clockIn, clockOut } from '../../../actions/shiftActions';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      clockInDesc: '',
      clockOutDesc: '',
      errors: {}
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleGetShifts = () => {
    this.props.getShifts();
  }

  handleClockIn = (e) => {
    e.preventDefault();

    const newWorkShift = {
      clockInDesc: this.state.clockInDesc
    };

    this.props.clockIn(newWorkShift);
    this.setState({ clockInDesc: '' });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { workShift, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <h1 className="display-4">Dashboard</h1>
          </Grid>
          <Grid 
            item 
            xs={12} md={6}
            container
            direction="row-reverse"
            justify="center"
            alignItems="flex-start"
          >
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
                <Grid item xs={6}>
                  <TextField
                    id="clockInDesc"
                    name="clockInDesc"
                    label="Description"
                    value={this.state.clockInDesc}
                    placeholder="Clock in description"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.onChange}
                  />
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button} 
                    onClick={this.handleClockIn} 
                  >
                    Clock In
                  </Button>
                </Grid> 
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleGetShifts}
              >
                Get Shifts
              </Button>
              {workShift.workShifts.map(workShift => <ShiftItem key={workShift._id} id={workShift._id} workShifts={workShift} />)}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  getShifts: PropTypes.func.isRequired,
  clockIn: PropTypes.func.isRequired,
  clockOut: PropTypes.func.isRequired
  
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});

export default connect(mapStateToProps, { getShifts, clockIn, clockOut })(withStyles(styles)(Dashboard));
