import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { clockIn, getOpenShifts } from '../../../../actions/shiftActions';
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
  },
  clockInBtn: {
    margin: '5px',
    height: 50
  }
});

class ClockInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clockInDesc: '',
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
    this.setState({[e.target.name]: e.target.value });
  }

  handleClockIn = (e) => {
    e.preventDefault();
    const newWorkShift = {
      clockInDesc: this.state.clockInDesc
    };

    this.props.clockIn(newWorkShift);
    this.setState({ clockInDesc: '' });
    this.props.getOpenShifts();
    this.handleClose();
  }

  render() {
    const { auth, classes } = this.props;

    return (
      <div>
        <Button 
          fullWidth
          variant="contained"
          color="primary" 
          className={classes.clockInBtn} 
          onClick={this.handleOpen}
        >
          Clock In
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="modal"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Clock In
            </Typography>
            <TextField
              id="clockInDesc"
              name="clockInDesc"
              label="Description"
              value={this.state.clockInDesc}
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
              onClick={this.handleClockIn}
            >
              Clock In
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
    );
  }
}

ClockInModal.propTypes = {
  auth: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clockIn: PropTypes.func.isRequired,
  getOpenShifts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workShift: state.workShift
});


export default connect(mapStateToProps, { clockIn, getOpenShifts })(withStyles(styles)(ClockInModal));