import React, { Component } from 'react';
import ShiftItem from './shifts/ShiftItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getShifts, getOpenShifts } from '../../../actions/shiftActions';
import { withStyles } from '@material-ui/core/styles';
import Timestamp from './Timestamp';
import OpenShifts from './shifts/OpenShifts';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      clockInDesc: '',
      clockOutDesc: '',
      errors: {}
    }
  }

  componentDidMount() {
    this.props.getOpenShifts();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleGetShifts = () => {
    this.props.getShifts();
  }

  render() {
    const { workShift, classes } = this.props;
    let timeTableContent;
    let openShiftList;
    if (workShift.loading) {
      timeTableContent = null;
    } else {
      timeTableContent = workShift.workShifts.map(workShift => <ShiftItem key={workShift._id} id={workShift._id} workShifts={workShift} />);
    }

    if (workShift.openShifts) {
      openShiftList = <OpenShifts openShifts={workShift.openShifts} />;
    } else {
      openShiftList = null;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            {openShiftList}
          </Grid>
          <Timestamp />
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleGetShifts}
              >
                Get Shifts
              </Button>

              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Clock In</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Clock Out</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeTableContent}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workShift: PropTypes.object.isRequired,
  getShifts: PropTypes.func.isRequired,
  getOpenShifts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});

export default connect(mapStateToProps, { getShifts, getOpenShifts })(withStyles(styles)(Dashboard));
