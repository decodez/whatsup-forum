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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.topic !== prevProps.topic) {
      this.setState({
        postSuccess: this.props.topic.postSuccess,
      });
      setTimeout(() => {
        this.setState({
          postSuccess: false,
        });
      }, 1500);
    }
  }

  onSubmit(e) {
    e.preventDefault();

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
      this.setState({ description: '', title: '' });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="topic-form">
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
          <label>Title</label>
          <input
            placeholder="Title of your topic"
            onChange={this.onChange}
            value={this.state.title}
            type="text"
            name="title"
          />
          <label>Description</label>
          <textarea
            placeholder="Description of your topic"
            onChange={this.onChange}
            value={this.state.description}
            type="text"
            name="description"
          />
          <button className="publish-btn btn--blue" type="submit">
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
