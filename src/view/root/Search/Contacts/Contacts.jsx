import React, { Component } from 'react';
import Contact from './Contact';

export default class Contacts extends Component {
    render() {
        let ret = [];

        if(this.props.users) {
            const users = this.props.users;

            for(let i=0; i<users.length; i++) {
                ret.push(
                    <Contact user={users[i]}/>
                );
            }
        }

        return (
            <div className="row">
                {ret}
            </div>
        );
    }
}