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
                    <Contacts users={this.props.users} />
                </div>
            </div>
        );
    }
};

const mapReduxStateToProps = function(rstate) {
    return {
        users: rstate.search.users
    }
}

export default connect(mapReduxStateToProps)(Search)