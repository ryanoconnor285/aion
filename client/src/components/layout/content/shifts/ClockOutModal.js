import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { clockOut, getOpenShifts, getShifts } from '../../../../actions/shiftActions';
import { Button, TextField, Typography, Modal } from '@material-ui/core';


const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  modal: {
    [theme.breakpoints.down('sm')]: {
      width: '370 px'
    },
    [theme.breakpoints.up('md')]: {
      width: theme.spacing.unit * 50,
    },
  },
  button: {
    margin: '5px'
  }
});

class ClockOutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clockOutDesc: '',
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClockOut = (id) => {
    const clockOutData = {
      clockOutDesc: this.state.clockOutDesc,
      id: this.props.id
    };
    this.props.clockOut(clockOutData);
    this.setState({ clockOutDesc: '' });
    this.props.getOpenShifts();
    this.props.getShifts();
    this.handleClose();
  };

  render() {
    const { auth, classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>{this.props.btnText}</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Clock Out
            </Typography>
            <TextField
              id="clockOutDesc"
              name="clockOutDesc"
              label="Description"
              value={this.state.clockOutDesc}
              placeholder="Clock in description"
              className={classes.textField}
              fullWidth
              margin="normal"
              onChange={this.onChange}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
              onClick={this.handleClockOut}
            >
              Clock Out
            </Button>
            {
              auth.user.timeStampAction
                ?
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  fullWidth
                  href={"tel:" + auth.user.timeStampAction}
                >
                  Call Teletime
                </Button>
                :
                null
            }
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
              onClick={this.handleClose}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    )
  }
}

ClockOutModal.propTypes = {
  auth: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clockOut: PropTypes.func.isRequired,
  getOpenShifts: PropTypes.func.isRequired,
  getShifts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workShift: state.workShift
});


export default connect(mapStateToProps, { clockOut, getOpenShifts, getShifts })(withStyles(styles)(ClockOutModal));