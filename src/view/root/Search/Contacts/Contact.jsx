import React, { Component } from 'react';
import SkillLable from '../../Profile/Skills/SkillLable';

export default class Contact extends Component {
    render() {
        if(!this.props.user) {
            return (
                <div/>
            );
        }

        const profile = this.props.user.profile;

        return (
            <div className="col-xs-12 col-sm-6 col-md-6">
                <div className="well well-sm">
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            <img src="{profile.avatarUrl}" alt="" className="img-rounded img-responsive" />
                        </div>
                        <div className="col-sm-6 col-md-8">
                            <h4>{profile.name} ({profile.username}) <SkillLable name={this.props.user.skill.name} rating={this.props.user.officialRating}/></h4>

                            <small>{profile.location}</small>
                            <p>
                                <i className="glyphicon glyphicon-envelope"></i>{profile.jobPosition}
                                <br />
                                <i className="glyphicon glyphicon-globe"></i>{profile.aboutMe}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}