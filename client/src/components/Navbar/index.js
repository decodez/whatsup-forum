import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';

import './style.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="menu-items">
        <ul className={this.state.openMenu ? 'nav-links active' : 'nav-links'}>
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
        <button
          onClick={this.toggleMenu}
          className={
            this.state.openMenu ? 'menu-handle active' : 'menu-handle'
          }>
          <span className="top"></span>
          <span className="middle"></span>
          <span className="bottom"></span>
        </button>
      </div>
    );

    const guestLinks = (
      <ul className="nav-links">
        <li className="nav-item">
          <Link className="nav-link btn--blue" to="/signup">
            Sign Up
          </Link>
        </li>
      </ul>
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
