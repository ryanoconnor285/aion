import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingAppBar from '../navigation/LandingAppBar';
import mainImage from '../../../images/action-asphalt-back-light-315938.jpg';
import infoCard1 from '../../../images/adult-agreement-beard-541522.jpg';
import infoCard2 from '../../../images/asphalt-blur-car-290470.jpg';
import infoCard3 from '../../../images/action-blur-city-590701.jpg';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  mainCard: {
    width: '100%',
  },
  mainCardP: {
    margin: 'auto',
    width: '50%',
  },
  mainCardActions: {
    margin: 'auto',
  },
  mainMedia: {
    marginTop: -50,
    width: '100%',
  },
  card: {
    maxWidth: '375',
  },
  media: {
    height: 150,
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
        <LandingAppBar />
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.mainCard}>
              <img src={mainImage} className={classes.mainMedia} alt="time-lapse"/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Aion
                </Typography>
                <Typography className={classes.mainCardP} component="p">
                  Clock in, clock out, how hard could it be?  Aion can help you keep track of the amount of time you work even if your employer is using another system to track time.  Your record  is easy to use and easy to access anywhere and anytime, mobile or desktop.  
                </Typography>
              </CardContent>
              <CardActions className={classes.mainCardActions}>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={infoCard1}
                alt="time-lapse"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Mobile Friendly
                </Typography>
                <Typography component="p">
                  This app is designed to be used on mobile to help you quickly keep track of your time from anywhere.  It also works great on desktop with easy to read tables.
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={infoCard2}
                alt="time-lapse"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Intuitive
                </Typography>
                <Typography component="p">
                  This app intuitively presents you with the information and actions you need to make tracking easy.  When you are clocked in, for example, you will be prompted to clock out the next time you use the app.  
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className={classes.card}>
              <img
                className={classes.media}
                src={infoCard3}
                alt="time-lapse"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Built Around You
                </Typography>
                <Typography component="p">
                  Let Aion make time tracking simple and easy for you.  You can quickly record shifts, billable hours, or even time spent on a project.  If you work 8, 12 or even 24 hours Aion can easily help you see .  
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </CardActions>
            </Card>
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