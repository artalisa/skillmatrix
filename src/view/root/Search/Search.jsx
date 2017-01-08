import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Contacts from './Contacts/Contacts';
import { connect } from 'react-redux';

class Search extends Component {
    render() {
        return (
            <div>
                <div className="App-header">
                    <SearchBar />
                </div>
                <div className="container" style={{paddingTop: '20px'}}>
                    <Contacts users={this.props.users} skillsRequired={this.props.skillsRequired}/>
                </div>
            </div>
        );
    }
};

const mapReduxStateToProps = function(rstate) {
    return {
        users: rstate.search.users.users,
        skillsRequired: [ rstate.search.users.skillsRequired ]
    }
}

export default connect(mapReduxStateToProps)(Search)