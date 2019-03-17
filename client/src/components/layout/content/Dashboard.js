import React, { Component } from 'react';
import ShiftItem from './shifts/ShiftItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getShifts } from '../../../actions/shiftActions';
import { withStyles } from '@material-ui/core/styles';
import LinearQuery from '../../common/LinearQuery';
import Timestamp from './Timestamp';
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

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleGetShifts = () => {
    this.props.getShifts();
  }

  render() {
    const { workShift, classes, loading } = this.props;
    let timeTableContent;

    if (loading) {
      timeTableContent = <LinearQuery />;
    } else {
      timeTableContent = workShift.workShifts.map(workShift => <ShiftItem key={workShift._id} id={workShift._id} workShifts={workShift} />);
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <h1 className="display-4">Dashboard</h1>
          </Grid>
          <Timestamp />
          <Grid item xs={12}>
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
                    <TableCell>Date In</TableCell>
                    <TableCell>Clock In</TableCell>
                    <TableCell>Date Out</TableCell>
                    <TableCell>Clock Out</TableCell>
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
  getShifts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  workShift: state.workShift
});

export default connect(mapStateToProps, { getShifts })(withStyles(styles)(Dashboard));
