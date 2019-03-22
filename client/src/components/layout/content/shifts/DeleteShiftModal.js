import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { clockIn, getOpenShifts } from '../../../../actions/shiftActions';
import { Button, Typography, Modal } from '@material-ui/core';


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

class DeleteShiftModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
    const { classes } = this.props;

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          onClick={this.handleOpen}
        >
          Delete
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
              Are you sure you want to permanently delete this shift?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
              onClick={this.handleClose}
            >
              Delete
            </Button>
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

DeleteShiftModal.propTypes = {
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


export default connect(mapStateToProps, { clockIn, getOpenShifts })(withStyles(styles)(DeleteShiftModal));