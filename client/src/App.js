import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/Navbar';
import Landing from './components/Landing';

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
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
