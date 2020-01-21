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
      postSuccess: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    const { params } = this.props.match;
    await this.props.setCurrentUser();
    await this.props.getSingleTopic({ id: params.id });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);

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

      console.log(this.props);
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
                <br />
                <i className="date">
                  {this.props.topic.singleTopic.date.split('T')[0]}
                </i>
              </div>
              {this.props.topic.singleTopic.comments.length !== 0 ? (
                this.props.topic.singleTopic.comments.map(item => (
                  <React.Fragment key={item._id}>
                    <div class="comment-item">
                      <p>{item.text}</p>
                    </div>
                    <br />
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
                {this.state.postSuccess && (
                  <div className="alert alert-success" role="alert">
                    Posted Successfully
                  </div>
                )}
                <form className="app-form" onSubmit={this.onSubmit}>
                  <textarea
                    placeholder="Leave a comment"
                    onChange={this.onChange}
                    type="text"
                    name="text"
                  />
                  <button className="btn publish-btn" type="submit">
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
