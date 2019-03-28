import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MediaCard from '../../common/MediaCard';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import mainImage from '../../../images/action-asphalt-back-light-315938.jpg';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  mainCard: {
    width: '100%',
  },
  mainMedia: {
    marginTop: -50,
    width: '110%',
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
      <div>
        <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.mainCard}>
              <CardActionArea>
                <img src={mainImage} className={classes.mainMedia} alt="time-lapse"/>
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <MediaCard />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MediaCard />
          </Grid>
          <Grid item xs={12} sm={4}>
            <MediaCard />
          </Grid>
        </Grid>
      </div>
      </div>
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