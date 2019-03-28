import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { getShifts, editShift, deleteShift } from '../../../../actions/shiftActions';
import { Button, Typography, Modal } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  deleteBtn: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  cancelBtn: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700],
    },
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

class DeleteShiftModal extends React.Component {
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

  handleDeleteShift = (id) => {
    this.props.deleteShift(id);
    this.props.getShifts();
    this.handleClose();
  }

  render() {
    const { workshift, classes } = this.props;
    const dateFormat = "MM/DD HH:mm";
    return (
      <div>
        <Button 
        variant="contained" 
        color="primary" 
        className={classNames(classes.button, classes.deleteBtn)}
        onClick={this.handleOpen}
        >
          Delete
          <DeleteIcon className={classes.rightIcon} />
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
              You are about to delete this shift.
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Clock In"
                  secondary=
                  {
                    workshift.clockIn
                      ?
                      <Moment format={dateFormat}>{workshift.clockIn}</Moment>
                      :
                      null
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Clock In Description"
                  secondary=
                  {
                    workshift.clockInDesc
                      ?
                      workshift.clockInDesc
                      :
                      null
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Clock Out"
                  secondary=
                  {
                    workshift.clockOut
                      ?
                      <Moment format={dateFormat}>{workshift.clockOut}</Moment>
                      :
                      null
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Clock Out Description"
                  secondary=
                  {
                    workshift.clockOutDesc
                      ?
                      workshift.clockOutDesc
                      :
                      null
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Duration"
                  secondary=
                  {
                    workshift.clockOut
                      ?
                      moment(workshift.clockOut).diff(moment(workshift.clockIn), 'hours', true).toFixed(1) + ' hrs'
                      :
                      workshift.clockOut
                  }
                />
              </ListItem>
            </List>
            <span>
              {this.state.confirmDelete ? "Are you sure you want to permanently delete this shift?" : null}
            </span>
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.button, classes.deleteBtn)}
              fullWidth
              onClick={() => { this.handleDeleteShift(workshift._id) }}
            >
              Permanently Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classNames(classes.button, classes.cancelBtn)}
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
  deleteShift: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  workShift: state.workShift
});


export default connect(mapStateToProps, { getShifts, editShift, deleteShift })(withStyles(styles)(DeleteShiftModal));