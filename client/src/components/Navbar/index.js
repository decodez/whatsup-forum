import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';

import './style.scss';

class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log(user);
    const authLinks = (
      <ul className="nav-links">
        <li className="nav-item">
          <Link className="nav-link" to="/create">
            New Topic
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/all-topics">
            All Topics
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/my-topics">
            MY Topics
          </Link>
        </li>
        <li className="nav-item">
          <a className="btn--logout" href="/api/users/logout">
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <li className="nav-item">
        <a className="btn--signup" href="/api/users/logout">
          SignUp
        </a>
      </li>
    );

    return (
      <header className="nav-bar">
        <nav>
          <p className="app-name">Whatsup Forum</p>
          {isAuthenticated ? authLinks : guestLinks}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
