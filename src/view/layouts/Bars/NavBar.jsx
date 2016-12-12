import React, { Component } from 'react';
import { Link } from 'react-router'
import '../../../css/Bars/NavBar.css';

export default class NavBar extends Component {
    render () {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">SkillMatrix</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><Link to="/search">Search</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><Link to="/project">Project</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}