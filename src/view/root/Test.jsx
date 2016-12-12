import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/test';

class Test extends Component {
    onClick() {
        const props = this.props;
        props.testAction('SomeNewCoolState');
    }
    render() {
        console.log('Test: ', this.props.test);
        return(
            <div>
                This redux test value: {this.props.test}
                <a onClick={this.onClick.bind(this)}> Test </a>
            </div>
        );
    }
}

const mapReduxStateToProps = function(rstate) {
    return {
        test: rstate.test
    }
}

const mapReduxDispatchToProps = function(dispatch) {
    return {
        testAction: function(state) { dispatch(actions.testAction(state)); }
    }
}

export default connect(mapReduxStateToProps, mapReduxDispatchToProps)(Test)