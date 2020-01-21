import React, { Component } from 'react';

import { connect } from 'react-redux';

import { addTopic } from '../../actions/topicActions';
import { setCurrentUser } from '../../actions/authActions';

import './style.scss';

class TopicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      error: '',
      postSuccess: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.setCurrentUser();
  }
  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    if (this.state.title === '' || this.state.description === '') {
      this.setState({ error: 'Please enter all fields' });
    } else {
      this.setState({ error: '' });
      const { user } = this.props.auth;

      const newTopic = {
        description: this.state.description,
        title: this.state.title,
        user,
      };

      this.props.addTopic(newTopic);
      this.setState({ text: '', title: '' });

      console.log(this.props);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="topic-form">
        <h1>Create New Topic</h1>

        {this.state.error && (
          <div className="alert alert-danger" role="alert">
            {this.state.error}
          </div>
        )}
        {this.state.postSuccess && (
          <div className="alert alert-success" role="alert">
            Posted Successfully
          </div>
        )}
        <form className="app-form" onSubmit={this.onSubmit}>
          <label>Title</label>
          <input
            placeholder="Title of your topic"
            onChange={this.onChange}
            type="text"
            name="title"
          />
          <label>Description</label>
          <textarea
            placeholder="Description of your topic"
            onChange={this.onChange}
            type="text"
            name="description"
          />
          <button className="publish-btn" type="submit">
            Publish
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  topic: state.topic,
});

export default connect(mapStateToProps, { setCurrentUser, addTopic })(
  TopicForm
);
