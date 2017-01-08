import React, { Component } from 'react';
import sl from 'servicelocator';
import SkillLable from './SkillLable';

export default class SkillSet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            skills: null
        };

        this.getSkills = this.getSkills.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.getSkillsName = this.getSkillsName.bind(this);
    }

    getSkills(){
        const smapi = sl.get('SkillMatrixAPI');
        const self = this;

        smapi.getUserSkills()
            .then(function(skills){
                console.log('Skills: ', skills);
                self.setState({
                    skills: skills
                });
            })
    }

    removeSkill(e, name) {
        e.preventDefault();

    }
    getSkillsName() {
        let ret = [];
        for(let i in this.state.skills) {
            ret.push(this.state.skills[i].skill.name);
        }

        return ret;
    }
    addSkill(e, final) {
        let value = e.target.value;
        const currentSkills = this.getSkillsName();
        const smapi = sl.get('SkillMatrixAPI');
        const self = this;

        if(value.substr(-1) === ';' || final) {
            const skills = value.replace(/ /g, '')
                .toLowerCase()
                .split(';')
                .filter(function(i){
                    return  currentSkills.indexOf(i) < 0;
                });
            smapi.addUserSkills('', skills)
                .then(function () {
                    console.log('Added skill');
                    self.getSkills();
                })

        }


    }

    render() {
        console.log('Render');
        const self = this;
        if(!this.state.skills) {
            this.getSkills();
            return(
                <div>
                    Loading ...
                </div>
            );
        }else{
            let skills = [];
            for(let i in this.state.skills) {
                const skill = this.state.skills[i];

                skills.push(
                    <SkillLable name={skill.skill.name} rating={skill.rating}>
                        <a onClick={function(e){ self.removeSkill(e, skill.skill.name); }}>( X )</a>
                    </SkillLable>
                )
            }
            return (
                <div>
                    <h3>Skills</h3>
                    {skills}
                    <br/><hr/>
                    <div className="form-group">
                        <input className="form-control" type="text" placeholder="Enter skill name separated by ;" onChange={this.addSkill} onBlur={function(e){self.addSkill(e, true);}}/>
                    </div>
                </div>

            );

        }
    }
}