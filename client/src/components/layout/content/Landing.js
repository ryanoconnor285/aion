import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import mainImage from '../../../images/abstract-astronomy-dark-924824.jpg';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    width: '100%',
  },
  media: {
    width: '100%',
    height: '90%',
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

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <img src={mainImage} className={classes.media} alt="time-lapse"/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
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