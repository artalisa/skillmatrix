import React, { Component } from 'react';
import ProfileSet from './ProfileSet';
import SkillSet from './Skills/SkillSet';

export default class Profile extends Component {
    render() {
        return(
            <div className="col-md-12 pull-md-3 bd-content">
                <div className="row">
                    <h2>Edit profile</h2>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Profile</div>
                            <div className="panel-body">
                                <ProfileSet />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Skills</div>
                            <div className="panel-body">
                                <SkillSet />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}