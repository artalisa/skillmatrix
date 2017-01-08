import React, { Component } from 'react';

export default class SkillLable extends Component {
    render() {
        return(

            <span className={"label " + (this.props.rating >= 1 ? 'label-success' : 'label-warning')} style={{margin: '5px'}}>
                {this.props.name} ({this.props.rating}) {this.props.children}
            </span>

        );
    }
}
