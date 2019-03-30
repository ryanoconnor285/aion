import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import LandingAppBar from '../navigation/LandingAppBar';
import mainImage from '../../../images/action-asphalt-back-light-315938.jpg';
import infoCard1 from '../../../images/adult-agreement-beard-541522.jpg';
import infoCard2 from '../../../images/asphalt-blur-car-290470.jpg';
import infoCard3 from '../../../images/action-blur-city-590701.jpg';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  mainCard: {
    width: '100%',
  },
  mainCardP: {
    [theme.breakpoints.down('sm')]: {
      width: 350
    },
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
    margin: 'auto',
  },
  mainCardActions: {
    margin: 'auto',
  },
  mainMedia: {
    marginTop: -50,
    width: '100%',
  },
  card: {
    height: 545,
    maxWidth: '375',
  },
  media: {
    marginTop: 6,
    height: '60%',
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
                  Clock in, clock out, how hard could it be?  Aion can help you keep track of the amount of time you work even you are self employed or your employer is using another system to track time.  Your record  is easy to use and easy to access anywhere and anytime, mobile or desktop.  
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
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
                  This application is designed to be used on mobile to help you quickly keep track of your time from anywhere.  It also works great on desktop with easy to read tables.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
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
                  Aion intuitively presents you with the information and actions you need to make tracking easy.  When you are clocked in, for example, you will be prompted to clock out the next time you log in.  
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
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
                  Let Aion make time tracking simple and easy for you.  You can quickly record shifts, billable hours, or even time spent on a project.  Aion works great for any duration even if you work past midnight, holdiays or weekends.      
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} >
            <Card className={classes.mainCard}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Aion is free to use, sign up is easy.  Let's get started.
                </Typography>
                <CardActions>
                  <Button color="inherit" component={Link} to="/register">
                    Register Now
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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