import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RecentShifts from './tables/RecentShifts';
import OpenShifts from './shifts/OpenShifts';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
});

class ShiftInfoTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { workShifts,openShifts, classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} variant="fullWidth">
            <Tab label="Recent Shifts" />
            <Tab label="Open Shifts" />
            <Tab label="Current Pay Period" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><RecentShifts workShifts={workShifts} /></TabContainer>}
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