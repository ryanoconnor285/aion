import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: 375,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Aion (Greek: Αἰών)
        </Typography>
          <Typography variant="h5" component="h2">
            A
          {bull}
            ion
        </Typography>
          <Typography className={classes.pos} color="textSecondary">
            (deity)
        </Typography>
          <Typography component="p">
             is a Hellenistic deity associated with time, the orb or circle encompassing the universe, and the zodiac. The "time" represented by Aion is unbounded, in contrast to Chronos as empirical time divided into past, present, and future. ... In Latin the concept of the deity may appear as Aevum or Saeculum.
          <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(Landing));