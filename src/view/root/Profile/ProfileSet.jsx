import React, { Component } from 'react';
import sl from 'servicelocator';
import $ from 'jquery';

export default class ProfileSet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null
        };

        this.getProfile = this.getProfile.bind(this);
    }

    getProfile(){
        const smapi = sl.get('SkillMatrixAPI');
        const self = this;

        smapi.getUser()
            .then(function(data){

                self.setState({
                    profile: data
                })
            });


    }

    submit(e){
        e.preventDefault();

        let data = {};

        $('#ProfileForm')
            .serializeArray()
            .map(function(x){data[x.name] = x.value;});

        const smapi = sl.get('SkillMatrixAPI');
        const self = this;

        smapi.updateUser('user', data)
            .then(function(){
                self.setState({
                    profile: data
                })
            });
    }

    render() {
        if(!this.state.profile) {
            this.getProfile();
            return (
                <div>
                    Loading ...
                </div>
            );
        }else {
            return (
                <form id="ProfileForm" onSubmit={this.submit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name='name' className="form-control" id="profileFormName" aria-describedby="nameHelp"
                               defaultValue={this.state.profile.name}
                               placeholder="Enter name"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobPosition">Job position</label>
                        <input type="text" name='jobPosition' className="form-control" id="profileFormJobPosition" aria-describedby="jobPositionHelp"
                               defaultValue={this.state.profile.jobPosition}
                               placeholder="Enter job position"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location"></label>
                        <input type="text" name='location' className="form-control" id="profileFormLocation" aria-describedby="locationHelp"
                               defaultValue={this.state.profile.location}
                               placeholder="Enter location"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="aboutMe">About Me</label>
                        <textarea name='aboutMe' className="form-control" id="profileFormAboutMe" aria-describedby="aboutMeHelp"
                                defaultValue={this.state.profile.aboutMe}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatarUrl">Avatar URL</label>
                        <input type="text" name='avatarUrl' className="form-control" id="profileFormAvatarUrl" aria-describedby="avatarUrlHelp"
                               defaultValue={this.state.profile.avatarUrl}
                               placeholder="Avatar URL"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            );
        }
    }
}