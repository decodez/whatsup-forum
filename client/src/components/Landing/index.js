import React, { Component } from 'react';

import { connect } from 'react-redux';

import { setCurrentUser } from '../../actions/authActions';

class Landing extends Component {
  async componentDidMount() {
    await this.props.setCurrentUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <h1> Welcome </h1>
        {isAuthenticated ? (
          <div>
            <br />
            <h2 className="display-5 mb-4">Welcome, {user.name}</h2>
          </div>
        ) : (
          <div className="google-btn-container">
            <a href="/api/users/google">
              <div className="google-btn">
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="signin"
                  />
                </div>
                <p className="btn-text">
                  <b>Log in with Google</b>
                </p>
              </div>
            </a>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setCurrentUser })(Landing);
