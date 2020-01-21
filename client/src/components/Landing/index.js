import React, { Component } from 'react';

import { connect } from 'react-redux';

import { setCurrentUser } from '../../actions/authActions';

import './style.scss';

class Landing extends Component {
  async componentDidMount() {
    await this.props.setCurrentUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <section className="app-landing-wrapper">
        <div className="app-landing">
          <h1> Welcome!</h1>
          <p> Ask and share anything and everything you wish!</p>
          {isAuthenticated ? (
            <div>
              <br />
              <h2 className="display-5 mb-4">{user.name}</h2>
            </div>
          ) : (
            <div className="login-form">
              <p>Please login to continue</p>
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

export default connect(mapStateToProps, { setCurrentUser })(Landing);
