import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { getOpenShifts, editShift } from '../../../../actions/shiftActions';
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
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      clockInTime: '',
      clockInDesc: '',
      clockOutTime: '',
      clockOutDesc: '',
      open: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      clockInTime: this.props.clockInTime,
      clockInDesc: this.props.clockInDesc,
      clockOutTime: this.props.clockOutTime,
      clockOutDesc: this.props.clockOutDesc,
    })
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

  handleEditShift = (e) => {
    e.preventDefault();
    const editShiftData = {
      id: this.props.id,
      clockInTime: moment(this.state.clockInTime).format(),
      clockInDesc: this.state.clockInDesc,
      clockOutTime: moment(this.state.clockOutTime).format(),
      clockOutDesc: this.state.clockOutDesc
    };
    console.log(editShiftData);
    this.props.editShift(editShiftData);
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
              id="clockInTime"
              name="clockInTime"
              label="Clock In"
              value={moment(this.state.clockInTime).format('MM/DD/YYYY, h:mm:ss a')}
              // value={this.state.clockInTime}
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
              // value={this.state.clockInDesc}
              placeholder="Clock in description"
              className={classes.textField}
              fullWidth
              margin="normal"
              onChange={this.onChange}
            />
            <TextField
              id="clockOutTime"
              name="clockOutTime"
              label="Clock Out"
              value={moment(this.state.clockOutTime).format('MM/DD/YYYY, h:mm:ss a')}
              // value={this.state.clockOutTime}
              placeholder="Clock out"
              className={classes.textField}
              fullWidth
              margin="normal"
              onChange={this.onChange}
            />
            <TextField
              id="clockOutDesc"
              name="clockOutDesc"
              label="Description"
              value={this.state.clockOutDesc}
              // value={this.state.clockOutDesc}
              placeholder="Clock out description"
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
              onClick={this.handleEditShift}
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
  getOpenShifts: PropTypes.func.isRequired,
  editShift: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workShift: state.workShift
});


export default connect(mapStateToProps, { getOpenShifts, editShift })(withStyles(styles)(EditShiftModal));