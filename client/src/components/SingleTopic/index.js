import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSingleTopic, addComment } from '../../actions/topicActions';
import { setCurrentUser } from '../../actions/authActions';

import './style.scss';

class SingleTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const { params } = this.props.match;
    await this.props.setCurrentUser();
    await this.props.getSingleTopic({ id: params.id });
  }

  async componentDidUpdate() {
    const { params } = this.props.match;
    await this.props.getSingleTopic({ id: params.id });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.description === '') {
      this.setState({ error: 'Please enter all fields' });
    } else {
      this.setState({ error: '' });
      const { user } = this.props.auth;

      const newComment = {
        text: this.state.text,
        id: this.props.topic.singleTopic._id,
        user,
      };

      this.props.addComment(newComment);
      this.setState({ text: '' });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="single-topic-wrapper">
        <div className="topic">
          {this.props.topic.singleTopic !== null ? (
            <React.Fragment>
              <div className="topic-header">
                <h1 className="topic-title">
                  {this.props.topic.singleTopic.title}
                </h1>
                <p className="topic-descrption">
                  {this.props.topic.singleTopic.description}
                </p>
                <div className="topic-info">
                  <span className="username">
                    {this.props.topic.singleTopic.name} |
                  </span>
                  <i className="date">
                    {this.props.topic.singleTopic.date.split('T')[0]}
                  </i>
                </div>
              </div>
              {this.props.topic.singleTopic.comments.length !== 0 ? (
                this.props.topic.singleTopic.comments.map(item => (
                  <React.Fragment key={item._id}>
                    <div className="comment-item">
                      <p className="comment-item__user">
                        {item.user} |
                        <span>
                          {this.props.topic.singleTopic.date.split('T')[0]}
                        </span>
                      </p>
                      <p className="comment-item__text">{item.text}</p>
                    </div>
                  </React.Fragment>
                ))
              ) : (
                <div>No comments</div>
              )}
              <div className="comment-form">
                {this.state.error && (
                  <div className="alert alert-danger" role="alert">
                    {this.state.error}
                  </div>
                )}
                <form className="app-form" onSubmit={this.onSubmit}>
                  <textarea
                    placeholder="Leave a comment"
                    onChange={this.onChange}
                    value={this.state.text}
                    type="text"
                    name="text"
                  />
                  <button className="btn--blue" type="submit">
                    Post Comment
                  </button>
                </form>
              </div>
            </React.Fragment>
          ) : (
            <p>loading....</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  topic: state.topic,
});

export default connect(mapStateToProps, {
  setCurrentUser,
  getSingleTopic,
  addComment,
})(SingleTopic);
