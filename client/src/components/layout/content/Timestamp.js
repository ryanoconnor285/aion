import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clockIn, getOpenShifts } from '../../../actions/shiftActions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
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

  handleClockIn = (e) => {
    e.preventDefault();
    const newWorkShift = {
      clockInDesc: this.state.clockInDesc
    };

    this.props.clockIn(newWorkShift);
    this.setState({ clockInDesc: '' });
    this.props.getOpenShifts();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render(){
    const { classes } = this.props;

    return(
      <div className={classes.container}>
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
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={this.handleClockIn}
        >
          Clock In
        </Button>
      </div>
    )
  };
}
Timestamp.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  clockIn: PropTypes.func.isRequired,
  getOpenShifts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});


export default connect(mapStateToProps, { clockIn, getOpenShifts })(withStyles(styles)(Timestamp));