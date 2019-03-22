import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { clockIn, getOpenShifts } from '../../../../actions/shiftActions';
import { Button, TextField, Typography, Modal, Fab, Icon } from '@material-ui/core';
import DeleteShiftModal from './DeleteShiftModal';


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

class EditShiftModal extends React.Component {
  constructor() {
    super();
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

  handleEditShift = (e) => {
    e.preventDefault();
    const editShiftData = {
      clockInDesc: this.state.clockInDesc
    };

    this.props.clockIn(editShiftData);
    this.setState({ clockInDesc: '' });
    this.props.getOpenShifts();
    this.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Fab 
          color="secondary" 
          aria-label="Edit" 
          className={classes.fab}
          onClick={this.handleOpen}
        >
          <Icon>edit_icon</Icon>
        </Fab>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="modal"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Update Shift 
            </Typography>
            <TextField
              id="clockIn"
              name="clockIn"
              label="Clock In"
              value={this.props.clockInTime}
              placeholder="Clock in time"
              className={classes.textField}
              fullWidth
              margin="normal"
              onChange={this.onChange}
            />
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
              onClick={this.handleClose}
            >
              Save Changes
            </Button>
            <DeleteShiftModal />
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

EditShiftModal.propTypes = {
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


export default connect(mapStateToProps, { clockIn, getOpenShifts })(withStyles(styles)(EditShiftModal));