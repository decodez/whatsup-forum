import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMyTopics } from '../../actions/topicActions';
import { setCurrentUser } from '../../actions/authActions';

class Dashboard extends Component {
  state = {
    topics: [],
  };
  async componentDidMount() {
    await this.props.setCurrentUser();
    await this.props.getMyTopics();
  }

  render() {
    return (
      <div className="topics-container">
        <div className="card-container">
          <h1>My Topics</h1>
          {this.props.topic.myTopics.length !== 0 ? (
            this.props.topic.myTopics.map(item => (
              <React.Fragment key={item._id}>
                <div className="card">
                  <Link to={`/topics/${item._id}`}>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-description">{item.description}</p>
                      <div className="card-info">
                        <span className="username">{item.name}</span>
                        <br />
                        <i className="date">{item.date.split('T')[0]}</i>
                      </div>
                    </div>
                  </Link>
                </div>
                <br />
              </React.Fragment>
            ))
          ) : (
            <div>Loading...</div>
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

export default connect(mapStateToProps, { getMyTopics, setCurrentUser })(
  Dashboard
);
