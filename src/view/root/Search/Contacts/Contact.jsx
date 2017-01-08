import React, { Component } from 'react';
import SkillLable from '../../Profile/Skills/SkillLable';
import './css/fontwebawesome.css';
import './css/contact.css';

export default class Contact extends Component {
    render() {
        if(!this.props.user) {
            return (
                <div/>
            );
        }

        const profile = this.props.user.profile;

        return (
                    <div className="col-md-6">
                        <div className="well profile">
                            <div className="col-sm-12">
                                <div className="col-xs-12 col-sm-8">
                                    <h2>{profile.name} ({profile.username})</h2>
                                    <p><strong>Job position: </strong> {profile.jobPosition}</p>
                                    <p><strong>Location: </strong> {profile.location}</p>
                                    <p><strong>About: </strong> {profile.aboutMe}</p>
                                    <p><strong>Skills: </strong><br/>
                                        <SkillLable name={this.props.user.skill.name} rating={this.props.user.officialRating}/>
                                    </p>
                                </div>
                                <div className="col-xs-12 col-sm-4 text-center">
                                    <figure>
                                        <img src={profile.avatarUrl} alt="" className="img-circle img-responsive" />
                                            <figcaption className="ratings">
                                                <p>Ratings
                                                    <a href="#">
                                                        <span className="fa fa-star"></span>
                                                    </a>
                                                    <a href="#">
                                                        <span className="fa fa-star"></span>
                                                    </a>
                                                    <a href="#">
                                                        <span className="fa fa-star"></span>
                                                    </a>
                                                    <a href="#">
                                                        <span className="fa fa-star"></span>
                                                    </a>
                                                    <a href="#">
                                                        <span className="fa fa-star-o"></span>
                                                    </a>
                                                </p>
                                            </figcaption>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }
}