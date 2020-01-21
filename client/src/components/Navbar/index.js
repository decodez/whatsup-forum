import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

import './style.scss';

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <header className="nav-bar">
        <nav>
          <p className="app-name">Whatsup Forum</p>
          {isAuthenticated ? (
            <a className="btn--logout" href="/api/users/logout">
              Logout
            </a>
          ) : (
            <p>Link</p>
          )}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
