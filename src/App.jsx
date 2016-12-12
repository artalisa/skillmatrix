import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'

import MainLayout from './view/layouts/MainLayout';
import Error404 from './view/errors/Error404';
import { Search } from './view/root/Search/Search';
import './css/App.css';

export  default class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={MainLayout}>
                    <IndexRoute component={Search} />
                    <Route path="search" component={Search} />
                    <Route path="*" component={Error404}/>
                </Route>
            </Router>
        );
    }
}



/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Search />
        </div>
        <div className="container" style={{paddingTop: '20px'}}>
            <div className="row">
                <Contact />
                <Contact />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
*/


