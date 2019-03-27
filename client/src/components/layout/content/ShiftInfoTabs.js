import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RecentShiftsTable from './tables/RecentShiftsTable';
import ShiftCard from '../content/cards/ShiftCard';
import OpenShifts from './shifts/OpenShifts';
import isEmpty from '../../../validation/isEmpty';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

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
    padding: `0 ${theme.spacing.unit * 2}px`,
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
        {value === 0 && 
          <TabContainer>
            {
              isMobile 
              ?
              <ShiftCard />
              :
              <RecentShiftsTable workShifts={workShifts} /> 
            }
          </TabContainer>}
        {value === 1 && <TabContainer><OpenShifts openShifts={openShifts}/></TabContainer>}
        {value === 2 && <TabContainer>Coming Soon</TabContainer>}
      </div>
    );
  }
}

ShiftInfoTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShiftInfoTabs);