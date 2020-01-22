import React, { Component } from 'react';

import { connect } from 'react-redux';

import { setCurrentUser, signinUser } from '../../actions/authActions';

import './style.scss';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      registerSuccess: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.setCurrentUser();
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({ error: 'Please enter all fields' });
    } else {
      const newUser = {
        username: this.state.username,
        password: this.state.password,
      };
      let regex = new RegExp('^[a-zA-Z0-9_-]{3,15}$');
      if (regex.test(this.state.username)) {
        this.setState({ error: '' });
        this.props.signinUser(newUser);
      } else {
        this.setState({ error: 'Invalid username' });
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(isAuthenticated);
    return (
      <section className="app-landing-wrapper">
        <div className="app-landing">
          <h1> Welcome!</h1>

          {isAuthenticated ? (
            <div>
              <h2 className="display-5 mb-4">{user.name}</h2>
              <p> Ask and share anything and everything you wish!</p>
              <br />
            </div>
          ) : (
            <div className="login-form">
              <p>Please login to continue</p>
              <form className="app-form" onSubmit={this.onSubmit}>
                <label>Username</label>
                <input
                  placeholder="Enter username"
                  onChange={this.onChange}
                  value={this.state.username}
                  type="text"
                  name="username"
                />
                <label>Password</label>
                <input
                  placeholder="Enter password"
                  onChange={this.onChange}
                  value={this.state.password}
                  type="password"
                  name="password"
                />
                <button className="publish-btn btn--blue" type="submit">
                  Sign In
                </button>
              </form>
              <br></br>
              <center>OR</center>
              <br></br>
              <div className="btn-social-login-wrapper">
                <a href="/api/users/google">
                  <div className="btn-social-login btn-social-login--google">
                    <img
                      className="google-icon"
                      src="/assets/images/google-logo.svg"
                      alt="signin"
                    />
                    <p className="btn-text">
                      <b>Log in with Google</b>
                    </p>
                  </div>
                </a>
                <a href="/api/users/facebook">
                  <div className="btn-social-login btn-social-login--facebook">
                    <img
                      className="google-icon"
                      src="/assets/images/facebook-logo.svg"
                      alt="signin"
                    />
                    <p className="btn-text">
                      <b>Log in with Facebook</b>
                    </p>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setCurrentUser, signinUser })(
  Landing
);
