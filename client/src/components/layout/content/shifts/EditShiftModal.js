import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import isEmpty from '../../../../validation/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import { getShifts, editShift, deleteShift } from '../../../../actions/shiftActions';
import { Button, TextField, Typography, Modal } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  clockInBtn: {
    margin: '5px',
    height: 50
  }
});

class EditShiftModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      clockIn: '',
      clockInDesc: '',
      clockOut: '',
      clockOutDesc: '',
      confirmDelete: false,
      open: false,
      errors: {}
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

  handleEditShift = () => {
    const editShiftData = {};
    editShiftData.id = this.props.workshift._id;
    editShiftData.clockInDesc = this.state.clockInDesc;
    editShiftData.clockOutDesc = this.state.clockOutDesc;
    if(!isEmpty(this.state.clockIn)){editShiftData.clockIn = moment(this.state.clockIn).format()}
    if(!isEmpty(this.state.clockOut)){editShiftData.clockOut = moment(this.state.clockOut).format()}
    this.props.editShift(editShiftData);
    this.props.getShifts();
    this.handleClose();
  }

  handleToggle() {
		this.setState(prevState => ({confirmDelete: !prevState.confirmDelete}));
	}

  handleDeleteShift = (id) => {
    this.props.deleteShift(id);
    this.props.getShifts();
    this.handleClose();
  }

  render() {
    const { workshift, classes } = this.props;
    
    const modalActions = (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={() => {this.handleEditShift()}}
        >
          Save Changes
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={() => { this.handleToggle()}}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={() => {this.handleClose()}}
        >
          Cancel
        </Button>
      </div>
    ); 
    
    const deleteActions = (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={() => {this.handleDeleteShift(this.props.id)}}
        >
          Permanently Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth
          onClick={() => { this.handleToggle()}}
        >
          Cancel
        </Button>
      </div>
    );

    return (
      <div>
        <Button variant="contained" color="secondary" className={classes.button}
          onClick={this.handleOpen}>
          Edit
          <EditIcon className={classes.rightIcon} />
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
              Update Shift 
            </Typography>
            <TextField
              id="clockIn"
              name="clockIn"
              label="Clock In"
              defaultValue={moment(workshift.clockIn).format('MM/DD/YYYY, hh:mm:ss a')}
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
              defaultValue={workshift.clockInDesc}
              placeholder="Clock in description"
              className={classes.textField}
              fullWidth
              margin="normal"
              onChange={this.onChange}
            />
            {
              workshift.clockOut
              ?
              <TextField
                id="clockOut"
                name="clockOut"
                label="Clock Out"
                defaultValue={moment(workshift.clockOut).format('MM/DD/YYYY, hh:mm:ss a')}
                placeholder="Clock out"
                className={classes.textField}
                fullWidth
                margin="normal"
                onChange={this.onChange}
              />
              : 
              null
            }
            {
              workshift.clockOut
              ?
              <TextField
                id="clockOutDesc"
                name="clockOutDesc"
                label="Description"
                defaultValue={workshift.clockOutDesc}
                placeholder="Clock out description"
                className={classes.textField}
                fullWidth
                margin="normal"
                onChange={this.onChange}
              />
              :
              null
            }
            <span>
              { this.state.confirmDelete ? "Are you sure you want to permanently delete this shift?" : null }
            </span>
            { this.state.confirmDelete ? deleteActions : modalActions }
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
  getShifts: PropTypes.func.isRequired, 
  editShift: PropTypes.func.isRequired,
  deleteShift: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workShift: state.workShift
});


export default connect(mapStateToProps, { getShifts, editShift, deleteShift })(withStyles(styles)(EditShiftModal));