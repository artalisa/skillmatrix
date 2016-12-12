import React, { Component } from 'react';
import NavBar from './Bars/NavBar';

export default class MainLayout extends Component {
    render() {
        return(
            <div className="App">
                <NavBar />
                {this.props.children}
            </div>
        );
    }
}