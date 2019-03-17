import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { clockOut } from '../../../../actions/shiftActions';
import SimpleModal from '../../../common/SimpleModal';
import Moment from 'react-moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class OpenShift extends React.Component {
  constructor() {
    super();
    this.state = {
      clockOutDesc: ''
    }
  }

  handleClockOut = (id) => {

    const clockOutData = {
      clockOutDesc: this.state.clockOutDesc,
      id: id
    };
    this.props.clockOut(clockOutData);
    this.setState({ clockInDesc: '' });
  }

  render() {
    const { openShifts, classes } = this.props;
    const dateFormat = "LT on MM/DD";
    
    const shiftList = 
      openShifts
       .map(openShift => 
        <ListItem key={openShift._id} id={openShift._id}>
          <Typography color="textSecondary">
             You clocked in <Moment format={dateFormat}>{openShift.clockIn}</Moment>. 
          </Typography>
          <Button color="primary" onClick={() => this.handleClockOut(openShift._id)}>
            Ready to clock out?
          </Button>
        </ListItem>);
    
    return (
      <List component="nav" className={classes.root}>
        <Typography gutterBottom variant="h4">
          Open Shifts
        </Typography>
        {shiftList}
      </List>
    );
  }
}

OpenShift.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  clockOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});

export default connect(mapStateToProps, { clockOut })(withStyles(styles)(OpenShift));