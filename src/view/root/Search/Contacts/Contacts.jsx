import React, { Component } from 'react';
import Contact from './Contact';

export default class Contacts extends Component {
    render() {
        let contacts = {};
        let ret = [];

        if(this.props.users.length !== 0) {

            const users = this.props.users;

            for (let i = 0; i < users.length; i++) {
                const user = users[i];

                if (!contacts[user.skill.name]) {
                    contacts[user.skill.name] = [];
                }

                contacts[user.skill.name].push(
                    <Contact user={user}/>
                );

            }


            if (contacts[this.props.skillsRequired[0]]) {
                ret.push(
                    <div className="panel panel-default">
                        <div className="panel-heading">{this.props.skillsRequired[0]}</div>
                        <div className="panel-body">
                            <div className="row">
                                {contacts[this.props.skillsRequired[0]]}
                            </div>
                        </div>
                    </div>
                );
                delete contacts[this.props.skillsRequired[0]];
            }
            if (contacts.length !== 0) {
                for (let skill in contacts) {
                    ret.push(
                        <div className="panel panel-default">
                            <div className="panel-heading">{skill}</div>
                            <div className="panel-body">
                                <div className="row">
                                    {contacts[skill]}
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        }

        return (
            <div className="row">
                {ret}
            </div>
        );
    }
}