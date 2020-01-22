import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Topics from './components/Topics';
import Dashboard from './components/Dashboard';
import TopicForm from './components/TopicForm';
import SingleTopic from './components/SingleTopic';
import Signup from './components/Signup';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app-wrapper">
            <Navbar />
            <div className="App">
              <Route exact path="/" component={Landing} />
              <Route exact path="/my-topics" component={Dashboard} />
              <Route exact path="/create" component={TopicForm} />
              <Route exact path="/all-topics" component={Topics} />
              <Route exact path="/topics/:id" component={SingleTopic} />
              <Route exact path="/signup" component={Signup} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
