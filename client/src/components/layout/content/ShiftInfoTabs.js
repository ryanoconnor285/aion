import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ShiftsTable from './tables/ShiftsTable';
import PayPeriod from './tables/PayPeriod';
import ShiftCard from '../content/cards/ShiftCard';
import isEmpty from '../../../validation/isEmpty';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// This component is rendered onto the Dashboard.  It displayed a content area with 3 tabs, Recent Shifts (default) - 5 most recent shifts, Open Shifts - notifies the user to manage any open shifts, Current Pay Period - displays the time card with total hours for the current pay period.   

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  padding: {
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('md')]: {
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
  },
});

class ShiftInfoTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { workShifts, openShifts, classes } = this.props;
    const { value } = this.state; 
    const isMobile = window.innerWidth <= 500;
    let openShiftCount; 
    if (isEmpty(openShifts)) {
      openShiftCount = null
    } else {
      openShiftCount = openShifts.length
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} variant="fullWidth">
            <Tab label="Recent Shifts" />
            {/* Badges show user how many open shifts the have*/}
            <Tab
              label={
                <Badge className={classes.padding} color="secondary" badgeContent={openShiftCount}>
                  Open Shifts
                </Badge>
              }
            />
            <Tab label="Current Pay Period" />
          </Tabs>
        </AppBar>

        {/* Table has better utility but does not look good on mobile, this will conditionally render a card on mobile and a table on desktop*/}
        {value === 0 && 
          <TabContainer>
            {
              isMobile 
              ?
              <ShiftCard workShifts={workShifts} />
              :
              <ShiftsTable workShifts={workShifts} /> 
            }
          </TabContainer>}
        {/* Table has better utility but does not look good on mobile, this will conditionally render a card on mobile and a table on desktop*/}
        {value === 1 && 
          <TabContainer>
            {
              isMobile
                ?
              <ShiftCard workShifts={openShifts} />
              :
              <ShiftsTable workShifts={openShifts} />
            }
          </TabContainer>}
        {value === 2 && <TabContainer><PayPeriod /></TabContainer>}
      </div>
    );
  }
}

ShiftInfoTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShiftInfoTabs);