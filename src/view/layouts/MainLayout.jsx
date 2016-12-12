import React, { Component } from 'react';

export default class MainLayout extends Component {
    render() {
        return(
            <div className="App">
                {this.props.children}
            </div>
        );
    }
}