import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSingleTopic } from '../../actions/topicActions';

import './style.scss';

class SingleTopic extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    this.props.getSingleTopic({ id: params.id });
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
                <h3>comments</h3>
              ) : (
                <div>comments</div>
              )}
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

export default connect(mapStateToProps, { getSingleTopic })(SingleTopic);
