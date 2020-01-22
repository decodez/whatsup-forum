import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { setCurrentUser, createUser } from '../../actions/authActions';

import './style.scss';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      password: '',
      error: '',
      registerSuccess: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.post !== prevProps.post) {
      this.setState({
        registerSuccess: this.props.auth.registerSuccess,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.setState({ error: 'Please enter all fields' });
    } else {
      const newUser = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
      };
      let regex = new RegExp('^[a-zA-Z0-9_-]{3,15}$');
      if (regex.test(this.state.username)) {
        this.setState({ error: '' });
        this.props.createUser(newUser);
      } else {
        this.setState({ error: 'Invalid username' });
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.props.auth.isAuthenticated) {
      return <Redirect to="/" />;
    } else if (this.state.registerSuccess) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="signup-form">
          {this.state.error && (
            <div className="alert alert--error" role="alert">
              {this.state.error}
            </div>
          )}
          {this.state.postSuccess && (
            <div className="alert alert--success" role="alert">
              Posted Successfully
            </div>
          )}
          <h1>Create New Topic</h1>

          <form className="app-form" onSubmit={this.onSubmit}>
            <label>Full Name</label>
            <input
              placeholder="Enter your full name"
              onChange={this.onChange}
              value={this.state.name}
              type="text"
              name="name"
            />
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
              Sign up
            </button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  topic: state.topic,
});

export default connect(mapStateToProps, { setCurrentUser, createUser })(Signup);
