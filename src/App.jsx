import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import './css/App.css';

import MainLayout from './view/layouts/MainLayout';
import Error404 from './view/errors/Error404';
import Search from './view/root/Search/Search';
import Profile from './view/root/Profile/Profile';

import Test from './view/root/Test';

export  default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <Router history={browserHistory}>
                    <Route path="/" component={MainLayout}>
                        <IndexRoute component={Search} />
                        <Route path="search" component={Search} />
                        <Route path="test" component={Test} />
                        <Route path="profile" component={Profile} />
                        <Route path="*" component={Error404}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}


