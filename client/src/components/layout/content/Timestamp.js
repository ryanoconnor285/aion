import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentShift, getShifts, clockIn, clockOut } from '../../../actions/shiftActions';
import { withStyles } from '@material-ui/core/styles';
import LinearQuery from '../../common/LinearQuery';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

class Timestamp extends React.Component {
  constructor() {
    super();
    this.state = {
      clockInDesc: '',
      clockOutDesc: '',
      currentShift: '',
      errors: {}
    }
  }

  componentDidMount(){
    this.props.getCurrentShift();
  }

  handleClockIn = (e) => {
    e.preventDefault();

    const newWorkShift = {
      clockInDesc: this.state.clockInDesc
    };

    this.props.clockIn(newWorkShift);
    this.setState({ clockInDesc: '' });
    this.props.getShifts();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render(){
    const { workShift, classes, loading } = this.props;
    let timeStampContent;

    if ( loading ) {
      timeStampContent = <LinearQuery />;
    } else {
      timeStampContent = <h1>Hello</h1>;
    }

    return(
      <Grid
        item
        xs={12} md={6}
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Paper className={classes.paper}>
          <form className={classes.container} noValidate autoComplete="off">
            <Grid item xs={12}>
              <TextField
                id={workShift.currentShift ? "clockOutDesc" : "clockInDesc"}
                name="clockInDesc"
                label="Description"
                value={this.state.clockInDesc}
                placeholder={workShift.currentShift ? "Clock out description" : "Clock in description"}
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
                {workShift.currentShift ? "Clock Out" : "Clock In"}
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    )
  };
}
Timestamp.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  getCurrentShift: PropTypes.func.isRequired,
  getShifts: PropTypes.func.isRequired,
  clockIn: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});


export default connect(mapStateToProps, { getCurrentShift, getShifts, clockIn, clockOut })(withStyles(styles)(Timestamp));