import React, { Component } from 'react';
import '../../style/register.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      timeStampAction: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };

  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      timeStampAction: this.state.timeStampAction,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <h1 className="register-header">Sign Up</h1>
        <form className="register-container" noValidate onSubmit={this.onSubmit}>
          <p>
            <input
              placeholder="First Name"
              name="firstName"
              value={this.state.firstName}
              onChange={this.onChange}
            />
          </p>
          <span>{errors.firstName ? errors.firstName : null}</span>
          <p>
            <input
              placeholder="Last Name"
              name="lastName"
              value={this.state.lastName}
              onChange={this.onChange}
            />
          </p>
          <span>{errors.lastName ? errors.lastName : null}</span>
          <p>
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </p>
          <span>{errors.email ? errors.email : null}</span>
          <p>
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </p>
          <span>{errors.password ? errors.password : null}</span>
          <p>
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              onChange={this.onChange}
              error={errors.confirmPassword}
            />
          </p>
          <span>{errors.confirmPassword ? errors.confirmPassword : null}</span>
          <span>{errors.emailExists ? errors.emailExists : null}</span>
          <Button
            style={{ color: 'white', backgroundColor: '#2196f3' }}
            fullWidth
            type="submit"
            onClick={this.onSubmit}
          >
            Register
          </Button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
